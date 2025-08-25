<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch, toRaw } from "vue"

const props = defineProps<{
  options: Record<string, unknown>
}>()

const container = ref<HTMLDivElement | null>(null)
let chart: any

onMounted(() => {
  const H = (window as any).Highcharts
  if (!H) {
    console.error("Highcharts no está cargado. Verificá el <script src='https://code.highcharts.com/highcharts.js'> en index.html.")
    return
  }
  chart = H.chart(container.value!, toRaw(props.options))
})

watch(
  () => props.options,
  (opts) => {
    if (chart && opts) chart.update(toRaw(opts), true, true)
  },
  { deep: true }
)

onBeforeUnmount(() => { if (chart) chart.destroy() })
</script>

<template>
  <div ref="container" class="w-100" style="min-height:320px"></div>
</template>
