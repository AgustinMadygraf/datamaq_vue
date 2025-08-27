/*
Path: src/router/index.ts
*/

import { createRouter, createWebHistory } from 'vue-router';
import DataMaqPanel from '../components/DataMaqPanel.vue';
import DisponibilidadPanel from '../components/DisponibilidadPanel.vue';
import RendimientoPanel from '../components/RendimientoPanel.vue';
import HistogramaPanel from '../components/HistogramaPanel.vue';
import VisionArtificialPanel from '../components/VisionArtificialPanel.vue';

const routes = [
  { path: '/', name: 'Produccion', component: DataMaqPanel },
  { path: '/vision-artificial', name: 'VisionArtificial', component: VisionArtificialPanel },
  { path: '/disponibilidad', name: 'Disponibilidad', component: DisponibilidadPanel },
  { path: '/rendimiento', name: 'Rendimiento', component: RendimientoPanel },
  { path: '/histograma', name: 'Histograma', component: HistogramaPanel },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
