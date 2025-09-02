<!--
Path: src/components/Botonera.vue
-->

<template>
  <div class="container-fluid py-2 bg-white botonera-container">
    <div class="d-flex flex-wrap justify-content-between align-items-center botonera">
      <!-- Botón: semana anterior -->
      <form action="?periodo=semana&amp;conta=1708010400000" method="post" class="botonI">
        <input type="hidden" name="csrf_token" value="">
        <button type="submit" class="presione fs-6 w-100 h-100 d-flex align-items-center justify-content-center text-center">
          <span>
            Semana <br class="d-md-none" /> anterior
          </span>
        </button>
      </form>
      <div class="spacer"></div>
      <!-- Botón: semana -->
      <form action="?periodo=semana&amp;conta=1708615200000" method="post" class="periodo">
        <input type="hidden" name="csrf_token" value="">
        <input type="submit" value="semana" class="presado">
      </form>
      <!-- Botón: turno -->
      <form action="?periodo=turno&amp;conta=1708615200000" method="post" class="periodo">
        <input type="hidden" name="csrf_token" value="">
        <input type="submit" value="turno" class="presione">
      </form>
      <!-- Botón: 2 horas -->
      <form action="?periodo=hora&amp;conta=1708615200000" method="post" class="periodo">
        <input type="hidden" name="csrf_token" value="">
        <input type="submit" value="2 horas" class="presione">
      </form>
      <div class="spacer"></div>
      <!-- Botón: semana siguiente -->
      <form action="?periodo=semana&amp;conta=1709220000000" method="post" class="botonD">
        <input type="hidden" name="csrf_token" value="">
        <button type="submit" class="presione fs-6 w-100 h-100 d-flex align-items-center justify-content-center text-center">
          <span>
            Semana <br class="d-md-none" /> siguiente
          </span>
        </button>
      </form>
      <!-- Botón: fin -->
      <form action="?periodo=semana" method="post" class="fin">
        <input type="hidden" name="csrf_token" value="">
        <input type="submit" value=">|" class="presione">
      </form>
    </div>
  </div>
</template>

<style scoped>
.botonera {
  width: 99%;
  margin: 0;
  background-color: white;
  padding: 10px;
}
/*
  Los estilos de los botones y la distribución de la botonera deben mantenerse y personalizarse aquí en CSS.
  No migrar los estilos de los botones a Bootstrap si se requiere un diseño específico.
*/
.periodo, .botonI, .botonD, .spacer, .fin {
  display: inline-block;
  height: 55px;
  margin: 0;
}
.periodo { width: 18%; }
.botonI { width: 20%; }
.botonD { width: 15%; }
.fin { width: 5%; }
.spacer { width: 1%; }
.presione, .presado {
  font-size: 14pt;
  width: 100%;
  height: inherit;
  padding: 10px;
  margin: 2px;
}
.presado {
  background-color: #4CAF50;
  color: white;
}
</style>
