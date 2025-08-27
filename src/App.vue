<!--
Path: src/App.vue
-->

<script setup lang="ts">
import Header from "./components/Header.vue"
import Footer from "./components/Footer.vue"
</script>

<template>
  <Header />
  <div class="container my-4">
    <router-view />
  </div>
  <Footer />
</template>
