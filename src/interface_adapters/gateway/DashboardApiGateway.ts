/*
Path: src/interface_adapters/gateway/DashboardApiGateway.ts
*/


import { API_ENDPOINTS } from '../../infrastructure/config'
import { historicalDashboardData } from '../../infrastructure/HistoricalDashboardData'

export async function fetchDashboardData(): Promise<any> {
  try {
    const response = await fetch(API_ENDPOINTS.DASHBOARD)
    if (!response.ok) throw new Error('Error al obtener datos del dashboard')
    return await response.json()
  } catch (e) {
    // Fallback: retorna datos históricos si falla la conexión
    return historicalDashboardData
  }
}
