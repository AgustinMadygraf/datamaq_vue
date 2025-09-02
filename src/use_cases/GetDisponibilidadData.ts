/*
Caso de uso para obtener los datos de disponibilidad usando el gateway.
Permite aplicar reglas de negocio si es necesario.
Ubicación: src/use_cases/GetDisponibilidadData.ts
*/

import type { Disponibilidad } from "../entities/Disponibilidad"
import { fetchDisponibilidad } from "../interface_adapters/gateway/DisponibilidadApiGateway"

export async function GetDisponibilidadData(): Promise<Disponibilidad> {
  // Aquí puedes aplicar reglas de negocio si es necesario
  const disponibilidad = await fetchDisponibilidad()
  // Ejemplo de regla: asegurar que los valores sumen 100
  const total = disponibilidad.values.reduce((acc, val) => acc + val, 0)
  if (total !== 100) {
    // Normalizar valores para que sumen 100
    const normalizedValues = disponibilidad.values.map(v => Math.round((v / total) * 100))
    return {
      ...disponibilidad,
      values: normalizedValues,
    }
  }
  return disponibilidad
}
