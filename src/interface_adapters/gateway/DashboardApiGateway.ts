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

    // Validación: debe haber series 'hoy', 'ayer', 'semana_anterior' y cada una debe tener 288 valores
    let valid = false
    if (data.series && typeof data.series === 'object') {
      const required = ['hoy', 'ayer', 'semana_anterior']
      valid = required.every(name => {
        const serie = data.series[name]
        return serie && Array.isArray(serie.data) && serie.data.length === 288
      })
      if (!valid) {
        console.warn('[DashboardApiGateway] Las series no tienen 288 valores (intervalos de 5 minutos) o faltan claves requeridas.', data.series)
      }
    }

    if (!valid) {
      // Aquí podrías notificar al backend o registrar el incidente
      // Retornar datos de fallback para evitar romper la UI
      return historicalDashboardData
    }

    console.info('[DashboardApiGateway] Datos validados correctamente (288 valores por serie), se pasan al use case.')
    return data
  } catch (e) {
    // Fallback: retorna datos históricos si falla la conexión
    console.error('[DashboardApiGateway] Error al obtener datos del dashboard:', e)
    return historicalDashboardData
  }
}
