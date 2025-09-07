/*
Path: src/interface_adapters/gateway/DashboardApiGateway.ts
*/


import { API_ENDPOINTS } from '../../infrastructure/config'
import { historicalDashboardData } from '../../infrastructure/HistoricalDashboardData'

import type { DashboardQueryParams } from '../../entities/DashboardQueryParams'
import { isValidDashboardQueryParams } from '../../entities/DashboardQueryParams'

export async function fetchDashboardData(params: DashboardQueryParams): Promise<any> {
  try {
    // Validar parámetros antes de construir la URL
    if (!isValidDashboardQueryParams(params)) {
      throw new Error('[DashboardApiGateway] Parámetros de consulta inválidos: ' + JSON.stringify(params))
    }
    
    // Construir query string
    const url = new URL(API_ENDPOINTS.DASHBOARD, window.location.origin)
    url.searchParams.set('periodo', 'dia')
    url.searchParams.set('fecha', params.fecha)
    url.searchParams.set('turno', params.turno)

    console.log('[DashboardApiGateway] Fetching from:', url.toString())
    
    const response = await fetch(url.toString())
    
    if (!response.ok) {
      console.warn(`[DashboardApiGateway] HTTP error: ${response.status} ${response.statusText}`)
      throw new Error(`Error de red: ${response.status} ${response.statusText}`)
    }
    
    // Verificar que el content-type sea application/json
    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      console.warn('[DashboardApiGateway] Respuesta no es JSON:', contentType)
      
      // Obtener el texto de la respuesta para debugging
      const textResponse = await response.text()
      console.error('[DashboardApiGateway] Contenido de respuesta no-JSON:', textResponse.substring(0, 200) + '...')
      
      throw new Error('La respuesta del servidor no es JSON válido')
    }

    const data = await response.json()
    console.log('[DashboardApiGateway] Datos recibidos correctamente')

    // Validación: debe haber series 'hoy', 'ayer', 'semana_anterior' y cada una debe tener 288 valores
    let valid = false
    if (data.series && typeof data.series === 'object') {
      const required = ['hoy', 'ayer', 'semana_anterior']
      valid = required.every(name => {
        const serie = data.series[name]
        return serie && Array.isArray(serie.data) && serie.data.length === 288
      })
      
      if (!valid) {
        console.warn('[DashboardApiGateway] Las series no tienen 288 valores o faltan claves requeridas.', 
          JSON.stringify(data.series, null, 2).substring(0, 300) + '...')
      }
    }

    if (!valid) {
      console.warn('[DashboardApiGateway] Usando datos históricos por formato inválido')
      return historicalDashboardData
    }

    return data
  } catch (e) {
    // Capturar errores específicos
    if (e instanceof SyntaxError) {
      console.error('[DashboardApiGateway] Error al parsear JSON:', e.message)
    } else if (e instanceof TypeError) {
      console.error('[DashboardApiGateway] Error de red o URL:', e.message)
    } else {
      console.error('[DashboardApiGateway] Error al obtener datos del dashboard:', e)
    }
    
    // Imprimir stack trace en desarrollo
    if (import.meta.env.MODE !== 'production') {
      console.debug('[DashboardApiGateway] Stack trace:', e instanceof Error ? e.stack : 'No stack trace')
    }
    
    console.warn('[DashboardApiGateway] Usando datos históricos por error')
    return historicalDashboardData
  }
}
