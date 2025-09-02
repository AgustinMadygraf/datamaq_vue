/*
Gateway para obtener datos de disponibilidad desde el backend.
Si la respuesta falla, retorna datos de ejemplo (fallback local).
Ubicación: src/interface_adapters/gateway/DisponibilidadApiGateway.ts
*/

import type { Disponibilidad } from "../../entities/Disponibilidad"
import { API_ENDPOINTS } from "../../infrastructure/config"
import { DisponibilidadSampleData } from "../../infrastructure/DisponibilidadSampleData"

export async function fetchDisponibilidad(): Promise<Disponibilidad> {
  try {
    const response = await fetch(API_ENDPOINTS.DISPONIBILIDAD)
    if (!response.ok) throw new Error("Network response was not ok")
    const data = await response.json()
    // Adaptar la respuesta del backend al modelo de dominio si es necesario
    return {
      categories: data.categories || ["Disponible", "No Disponible"],
      values: data.values || [data.disponible, data.noDisponible],
    }
  } catch (error) {
    // Fallback a datos de ejemplo desde infrastructure
    return DisponibilidadSampleData
  }
}
