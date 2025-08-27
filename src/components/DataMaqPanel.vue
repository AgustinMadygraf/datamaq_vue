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
  <div class="row g-3">
    <div class="col-12 col-md-8">
      <InfoDisplay
        :velocidad="dashboard?.features?.velocidad_ultima_bpm?.toString() ?? ''"
        :formato="dashboard?.producto?.formato ? `${dashboard.producto.formato.height_mm} X ${dashboard.producto.formato.width_mm} X ${dashboard.producto.formato.gusset_mm}` : ''"
        :anchoBobina="dashboard?.producto?.web_width_mm?.toString() ?? ''"
        :loading="loading"
      />
      <Dashboard />
      <Botonera />
    </div>
    <aside class="col-12 col-md-4">
      <DataMaqInfo />
    </aside>
  </div>
</template>
