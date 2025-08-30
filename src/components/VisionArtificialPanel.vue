<!--
Path: src/components/VisionArtificialPanel.vue
-->

<script setup>
import { ref, onMounted, watch } from 'vue'
import VisionArtificialInfo from "./VisionArtificialInfo.vue"

const streams = ref([])
const selectedStream = ref(null)
const streamUrl = ref('')
const snapshotUrl = ref('')
const loading = ref(false)
const error = ref('')
const usarFiltro = ref(true) // switch para filtro

// Obtiene la lista de streams disponibles
async function fetchStreams() {
  loading.value = true
  error.value = ''
  try {
  const res = await fetch('http://localhost:5001/api/computer_vision/streams')
    if (!res.ok) {
      console.warn('Respuesta no OK al obtener streams:', res)
      throw new Error('No se pudo obtener la lista de streams')
    }
    const text = await res.text()
    // Detecta si la respuesta es HTML (error backend)
    if (text.trim().startsWith('<')) {
      console.error('Respuesta inesperada (HTML) al obtener streams:', text)
      throw new Error('Respuesta inesperada del backend (¿está corriendo en el puerto correcto?)')
    }
    let data
    try {
      data = JSON.parse(text)
    } catch (jsonErr) {
      console.error('Error al parsear JSON de streams:', jsonErr, text)
      throw new Error('Respuesta inválida del backend (no es JSON)')
    }
    streams.value = [
      ...data.usb.map(s => ({ ...s, tipo: 'usb' })),
      ...data.wifi.map(s => ({ ...s, tipo: 'wifi' })),
      ...data.img.map(s => ({ ...s, tipo: 'img' }))
    ]
    console.log('Streams obtenidos:', streams.value)
    if (streams.value.length > 0) {
      selectStream(streams.value[0])
    }
  } catch (e) {
    error.value = e.message
    console.error('Error en fetchStreams:', e)
  } finally {
    loading.value = false
  }
}

function getStreamUrl(stream) {
  if (!stream) return ''
  const tipoStream = usarFiltro.value ? 'stream_filtro.mjpg' : 'stream_original.mjpg'
  const url = `http://localhost:5001/api/computer_vision/${stream.tipo}/${stream.index}/${tipoStream}`
  console.log('URL del stream:', url)
  return url
}

function selectStream(stream) {
  selectedStream.value = stream
  streamUrl.value = getStreamUrl(stream)
  snapshotUrl.value = ''
  console.log('Stream seleccionado:', stream)
}

// Actualiza el streamUrl cuando cambia el switch de filtro
watch([selectedStream, usarFiltro], ([stream]) => {
  streamUrl.value = getStreamUrl(stream)
})

async function takeSnapshot() {
  if (!selectedStream.value) return
  loading.value = true
  error.value = ''
  try {
  const url = `http://localhost:5001/api/computer_vision/${selectedStream.value.tipo}/${selectedStream.value.index}/snapshot.jpg`
    const res = await fetch(url)
    if (!res.ok) {
      console.warn('Respuesta no OK al tomar snapshot:', res)
      if (res.status === 503) {
        error.value = 'No se pudo capturar frame (cámara no disponible)'
      } else {
        error.value = 'Error al tomar snapshot'
      }
      return
    }
    // Detecta si la respuesta es HTML (error backend)
    const contentType = res.headers.get('content-type')
    if (contentType && contentType.includes('text/html')) {
      const text = await res.text()
      console.error('Respuesta inesperada (HTML) al tomar snapshot:', text)
      error.value = 'Respuesta inesperada del backend al tomar snapshot'
      return
    }
    const blob = await res.blob()
    snapshotUrl.value = URL.createObjectURL(blob)
    console.log('Snapshot capturado:', snapshotUrl.value)
  } catch (e) {
    error.value = e.message
    console.error('Error en takeSnapshot:', e)
  } finally {
    loading.value = false
  }
}

onMounted(fetchStreams)
</script>

<template>
  <div>
    <h2>Visión Artificial</h2>
    <VisionArtificialInfo />
    <div v-if="loading">Cargando...</div>
    <div v-if="error" style="color: red;">{{ error }}</div>
    <div v-if="streams.length > 0">
      <label for="stream-select">Fuente:</label>
      <select id="stream-select" v-model="selectedStream" @change="selectStream(selectedStream)">
        <option v-for="s in streams" :key="s.tipo + '-' + s.index" :value="s">
          {{ s.name || s.tipo + ' ' + s.index }}
        </option>
      </select>
      <div v-if="streamUrl">
        <h3>Stream</h3>
        <img :src="streamUrl" alt="Stream" style="max-width: 100%; border: 1px solid #ccc;" />
        <div class="form-check form-switch mt-2">
          <input class="form-check-input" type="checkbox" id="filtro-switch" v-model="usarFiltro">
          <label class="form-check-label" for="filtro-switch">Filtro amarillo</label>
        </div>
      </div>
      <button @click="takeSnapshot" :disabled="loading || !selectedStream">Tomar Snapshot</button>
      <div v-if="snapshotUrl">
        <h3>Snapshot</h3>
        <img :src="snapshotUrl" alt="Snapshot" style="max-width: 100%; border: 1px solid #ccc;" />
      </div>
    </div>
    <div v-else-if="!loading && !error">No hay streams disponibles.</div>
  </div>
</template>
