@'
<script setup lang="ts">
import Chart from "./components/Chart.vue"
import { title, options } from "./appSetup"
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
