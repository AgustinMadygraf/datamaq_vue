<!--
Path: src/components/disponibilidad//DisponibilidadPanel.vue
-->

<template>
  <div>
    <h2>Disponibilidad</h2>
    <div v-if="loading">Cargando...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else>
      <highcharts :options="chartOptions" v-if="chartOptions" />
      <DisponibilidadInfo />
    </div>
  </div>
</template>


<script setup>
import DisponibilidadInfo from "./DisponibilidadInfo.vue"
import { useDisponibilidadController } from "../../interface_adapters/controller/useDisponibilidadController"
import HighchartsVue from 'highcharts-vue'

const { chartOptions, loading, error } = useDisponibilidadController()
</script>

<style scoped>
/* Puedes agregar estilos personalizados aquí */
</style>
