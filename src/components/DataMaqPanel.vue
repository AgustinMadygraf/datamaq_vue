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
  <div class="panel-container">
    <div class="main-content">
      <InfoDisplay
        :velocidad="dashboard?.features?.velocidad_ultima_bpm?.toString() ?? ''"
        :formato="dashboard?.producto?.formato ? `${dashboard.producto.formato.height_mm} X ${dashboard.producto.formato.width_mm} X ${dashboard.producto.formato.gusset_mm}` : ''"
        :anchoBobina="dashboard?.producto?.web_width_mm?.toString() ?? ''"
        :loading="loading"
      />
      <Dashboard />
      <Botonera />
    </div>
    <aside class="sidebar">
      <DataMaqInfo />
    </aside>
  </div>
</template>
<style scoped>
.panel-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.main-content {
  flex: 1;
}
.sidebar {
  width: 100%;
}
@media (min-width: 768px) {
  .panel-container {
    flex-direction: row;
    align-items: flex-start;
  }
  .main-content {
    flex: 3;
  }
  .sidebar {
    flex: 1;
    max-width: 350px;
    margin-left: 2rem;
    width: 100%;
  }
}
</style>