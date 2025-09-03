/*
Path: src/infrastructure/DisponibilidadSampleData.ts
Datos de ejemplo para disponibilidad (para fallback local)
*/

import type { Disponibilidad } from "../entities/Disponibilidad"

export const DisponibilidadSampleData: Disponibilidad = {
  period: { start: "2025-09-02T06:00:00-03:00", end: "2025-09-02T14:00:00-03:00", minutesTotal: 480 },
  minutes: {
    operating: 315,
    plannedDowntime: 85,
    unplannedDowntime: 80
  },
  availability: 315 / 480,
  breakdown: {
    planned: {
      SETUP_CAMBIO_FORMATO: 45,
      MANTENIMIENTO_PLANIFICADO: 30,
      SIN_ORDEN_TRABAJO: 10
    },
    unplanned: {
      ROTURA: 35,
      FALTA_MATERIA_PRIMA: 15,
      FALTA_MAQUINISTA: 10,
      FALTA_DOTACION: 5,
      ESPERA_CALIDAD: 10,
      CORTE_ENERGIA: 5
    }
  },
  events: [
    { start: "2025-09-02T07:10:00-03:00", end: "2025-09-02T07:55:00-03:00", minutes: 45, tipo: "PROGRAMADO", razon: "SETUP_CAMBIO_FORMATO" },
    { start: "2025-09-02T09:30:00-03:00", end: "2025-09-02T10:05:00-03:00", minutes: 35, tipo: "NO_PROGRAMADO", razon: "ROTURA" },
    // ...
  ]
}
