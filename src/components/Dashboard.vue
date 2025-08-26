<script setup lang="ts">
import { useDashboardController } from "../interface_adapters/controller/DashboardController"

const { dashboard, loading, error } = useDashboardController()
</script>

<template>
  <div v-if="loading">Cargando...</div>
  <div v-else-if="error">Error: {{ error }}</div>
  <div v-else>
    <h2>Dashboard</h2>
    <pre>{{ dashboard }}</pre>
    <!-- Aquí puedes mapear y mostrar los datos como desees -->
  </div>
</template>
