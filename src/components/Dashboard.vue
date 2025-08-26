<script setup lang="ts">
import { useDashboardController } from "../interface_adapters/controller/DashboardController"
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

<style scoped>
.dashboard-fullscreen {
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
  min-width: 100vw;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  align-items: stretch;
  justify-content: stretch;
}
</style>
