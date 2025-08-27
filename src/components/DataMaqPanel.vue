<!--
Path: src/components/DataMaqPanel.vue
-->

<script setup lang="ts">
import InfoDisplay from "./InfoDisplay.vue"
import Dashboard from "./Dashboard.vue"
import Botonera from "./Botonera.vue"
import DataMaqInfo from "./DataMaqInfo.vue"
import { useDashboardController } from "../interface_adapters/controller/DashboardController"

const { dashboard, loading } = useDashboardController()
</script>

<template>
  <br>
  <div class="container-fluid my-4 mt-5">
    <InfoDisplay
      :velocidad="dashboard?.features?.velocidad_ultima_bpm?.toString() ?? ''"
      :formato="dashboard?.producto?.formato ? `${dashboard.producto.formato.height_mm} X ${dashboard.producto.formato.width_mm} X ${dashboard.producto.formato.gusset_mm}` : ''"
      :anchoBobina="dashboard?.producto?.web_width_mm?.toString() ?? ''"
      :loading="loading"
    />
    <Dashboard />
    <Botonera />
    <DataMaqInfo />
  </div>
</template>