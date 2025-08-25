@'
<script setup lang="ts">
import { ref } from "vue"
import Chart from "./components/Chart.vue"

const title = ref("Producción por hora")
const options = ref<Record<string, unknown>>({
  chart: { type: "line" },
  title: { text: "Velocidad de producción" },
  xAxis: { categories: ["08:00","09:00","10:00","11:00","12:00"] },
  yAxis: { title: { text: "Unidades / h" } },
  series: [
    { type: "line", name: "Línea A", data: [120,135,128,142,150] },
    { type: "line", name: "Línea B", data: [100,110,125,130,145] }
  ],
  credits: { enabled: false }
})
</script>

<template>
  <div class="container my-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h1 class="h3 m-0">{{ title }}</h1>
      <button class="btn btn-primary btn-sm"
              @click="options.xAxis = { categories: ['13:00','14:00','15:00','16:00','17:00'] }">
        Cambiar ejes (demo)
      </button>
    </div>
    <div class="card shadow-sm">
      <div class="card-body">
        <Chart :options="options" />
      </div>
    </div>
  </div>
</template>
