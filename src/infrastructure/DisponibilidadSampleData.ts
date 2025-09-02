/*
Datos de ejemplo para disponibilidad (para fallback local)
Ubicación: src/infrastructure/DisponibilidadSampleData.ts
*/

import type { Disponibilidad } from "../entities/Disponibilidad"

export const DisponibilidadSampleData: Disponibilidad = {
  categories: ["Disponible", "No Disponible", "En Mantenimiento"],
  values: [65, 25, 10],
}
