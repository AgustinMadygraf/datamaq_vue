/*
Path: src/interface_adapters/gateway/DashboardApiGateway.ts
*/


import { API_ENDPOINTS } from '../../infrastructure/config'
import { historicalDashboardData } from '../../infrastructure/HistoricalDashboardData'

export async function fetchDashboardData(): Promise<any> {
  try {
    const response = await fetch(API_ENDPOINTS.DASHBOARD)
    if (!response.ok) throw new Error('Error al obtener datos del dashboard')
    const data = await response.json()

    console.info('[DashboardApiGateway] Datos recibidos de la API:', data)

    // Validación: debe haber series 'hoy', 'ayer', 'semana_anterior' o datos por hora
    let valid = false
    if (Array.isArray(data.series)) {
      // Caso 1: series es array de objetos por hora (histórico)
      if (data.series.length && data.series[0].t) {
        console.debug('[DashboardApiGateway] Formato histórico detectado (por hora).')
        valid = true
      } else if (data.series.find && typeof data.series.find === 'function') {
        // Caso 2: series es array de series con nombre
        const required = ['hoy', 'ayer', 'semana_anterior']
        valid = required.every(name => !!data.series.find((s: any) => s.name === name))
        console.debug('[DashboardApiGateway] Formato series con nombre detectado:', data.series.map((s: any) => s.name))
      }
    }

    if (!valid) {
      console.warn('[DashboardApiGateway] La API no provee las series requeridas (hoy, ayer, semana_anterior) o el formato es incorrecto.', data.series)
      // Aquí podrías notificar al backend o registrar el incidente
      // Retornar datos de fallback para evitar romper la UI
      return historicalDashboardData
    }

    console.info('[DashboardApiGateway] Datos validados correctamente, se pasan al use case.')
    return data
  } catch (e) {
    // Fallback: retorna datos históricos si falla la conexión
    console.error('[DashboardApiGateway] Error al obtener datos del dashboard:', e)
    return historicalDashboardData
  }
}
