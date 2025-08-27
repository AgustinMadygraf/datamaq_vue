<!--
Path: src/components/Header.vue
-->

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" role="navigation">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">DATAMAQ</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item"><router-link class="nav-link" to="/">Gráfico de Producción</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/vision-artificial">Visión Artificial</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/disponibilidad">Disponibilidad</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/rendimiento">Rendimiento</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/histograma">Histograma</router-link></li>
        </ul>
      </div>
    </div>
  </nav>
</template>
