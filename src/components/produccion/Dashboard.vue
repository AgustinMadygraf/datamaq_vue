<!--
Path: src/components/produccion/Dashboard.vue
-->

<script setup lang="ts">
import { useDashboardController } from "../../interface_adapters/controller/DashboardController"
import Chart from "./Chart.vue"

const { chartOptions, loading, error } = useDashboardController()
</script>

<template>
  <div v-if="loading">Cargando...</div>
  <div v-else-if="error">Error: {{ error }}</div>
  <div v-else class="dashboard-fullscreen">
    <Chart v-if="chartOptions" :options="chartOptions" />
  </div>
</template>

