<!--
Path: src/components/disponibilidad//DisponibilidadPanel.vue
-->

<template>
  <div class="row g-3">
    <div class="col-12 col-md-8">
      <h2>Disponibilidad</h2>
      <div v-if="loading">Cargando...</div>
      <div v-else-if="error">Error: {{ error }}</div>
      <highcharts :options="chartOptions" v-if="chartOptions" />
    </div>
    <aside class="col-12 col-md-4">
      <DisponibilidadInfo />
    </aside>
  </div>
</template>


<script setup>
import DisponibilidadInfo from "./DisponibilidadInfo.vue"
import { useDisponibilidadController } from "../../interface_adapters/controller/useDisponibilidadController"
import HighchartsVue from 'highcharts-vue'

const { chartOptions, loading, error } = useDisponibilidadController()
</script>
