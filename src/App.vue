<!--
Path: src/App.vue
-->

<script setup lang="ts">
import DataMaqPanel from "./components/DataMaqPanel.vue"
import Header from "./components/Header.vue"
</script>

<template>
  <Header />
  <div class="container my-4">
    <DataMaqPanel />
  </div>
</template>
