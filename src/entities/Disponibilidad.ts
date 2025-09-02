/*
Entidad de dominio para los datos de disponibilidad (gráfico de torta)
Ubicación: src/entities/Disponibilidad.ts
*/

export interface Disponibilidad {
  categories: string[]; // Ejemplo: ["Disponible", "No Disponible"]
  values: number[];     // Ejemplo: [80, 20]
  // Opcionalmente puedes agregar:
  // total?: number;
  // timestamp?: string;
}
