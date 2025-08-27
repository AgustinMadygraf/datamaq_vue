<!--
Path: src/App.vue
-->

<script setup lang="ts">
import Dashboard from "./components/Dashboard.vue"
import Botonera from "./components/Botonera.vue"
import Cabecera from "./components/Cabecera.vue"
import { useDashboardController } from "./interface_adapters/controller/DashboardController"

const { dashboard, loading } = useDashboardController()
</script>

<template>
  <div class="container my-4">
    <Cabecera
      :velocidad="dashboard?.features?.velocidad_ultima_bpm?.toString() ?? ''"
      :formato="dashboard?.producto?.formato ? `${dashboard.producto.formato.height_mm} X ${dashboard.producto.formato.width_mm} X ${dashboard.producto.formato.gusset_mm}` : ''"
      :anchoBobina="dashboard?.producto?.web_width_mm?.toString() ?? ''"
      :loading="loading"
    />
    <Dashboard />
    <Botonera />
  </div>
</template>
