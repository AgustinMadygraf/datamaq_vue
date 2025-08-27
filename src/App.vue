<!--
Path: src/App.vue
-->

<script setup lang="ts">
import Dashboard from "./components/Dashboard.vue"
import Botonera from "./components/Botonera.vue"
import Cabecera from "./components/Cabecera.vue"
</script>

<template>
  <div class="container my-4">
    <Cabecera />
    <Dashboard />
    <Botonera />
  </div>
</template>
