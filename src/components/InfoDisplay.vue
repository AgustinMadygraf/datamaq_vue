<!--
Path: src/components/InfoDisplay.vue
-->

<script setup lang="ts">
const props = defineProps<{
  velocidad: string
  formato: string
  anchoBobina: string
  loading?: boolean
}>()
</script>

<template>
  <div class="info_display">
    <div class="c1">
      <p2>Velocidad {{ props.velocidad }} unidades por minuto</p2>
      <p1>Formato {{ props.formato }}</p1>
      <p2 style="background-color: transparent;">Ancho Bobina {{ props.anchoBobina }}mm</p2>
    </div>
  </div>
</template>

<style scoped>
.info_display {
  background-color: rgba(240,240,240,.5);
  margin-bottom: 0.3em;
  position: relative;
  padding: 15px;
  border-radius: 10px;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
}
.c1 {
  text-align: center;
  font-family: verdana;
  padding-top: 5px;
}
p2 {
  font-size: 28pt;
  margin: 0;
  display: block;
}
p1 {
  font-size: 34pt;
  padding-bottom: 5px;
  display: block;
}
</style>
