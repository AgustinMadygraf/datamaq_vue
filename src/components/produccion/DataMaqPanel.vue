<!--
Path: src/components/DataMaqPanel.vue
-->

<script setup lang="ts">
import InfoDisplay from "./InfoDisplay.vue"
import Dashboard from "./Dashboard.vue"
import Botonera from "./Botonera.vue"
import DataMaqInfo from "./DataMaqInfo.vue"
import { useDashboardController } from "../../interface_adapters/controller/DashboardController"
import { getInfoDisplayProps } from "../../interface_adapters/presenter/DataMaqPanelPresenter"

const { dashboard, loading } = useDashboardController()
// Aseguro que infoDisplayProps sea un computed
const infoDisplayProps = getInfoDisplayProps(dashboard.value)
</script>

<template>
  <div class="row g-3">
    <div class="col-12 col-md-8">
      <InfoDisplay
        :velocidad="infoDisplayProps.velocidad"
        :formato="infoDisplayProps.formato"
        :anchoBobina="infoDisplayProps.anchoBobina"
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
