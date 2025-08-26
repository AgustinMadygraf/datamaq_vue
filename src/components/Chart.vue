<script setup lang="ts">
import { useChartController } from "../interface_adapters/controller/ChartController"

const props = defineProps<{ options: Record<string, unknown> }>()
const { container } = useChartController(props)
</script>

<template>
  <div ref="container" class="chart-fullscreen"></div>
</template>
/* Agregar estilos para fullscreen */
<style scoped>
.chart-fullscreen {
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
  min-width: 100vw;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
