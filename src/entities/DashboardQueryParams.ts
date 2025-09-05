/*
Path: src/entities/DashboardQueryParams.ts
Value Object para los parámetros de consulta del dashboard
*/

export interface DashboardQueryParams {
  fecha: string // formato YYYY-MM-DD
  turno: 'central' | 'manana' | 'tarde' | 'dia' | 'completo'
}

export function isValidDashboardQueryParams(params: any): params is DashboardQueryParams {
  const validTurnos = ['central', 'manana', 'tarde', 'dia', 'completo']
  return (
    typeof params === 'object' &&
    typeof params.fecha === 'string' &&
    /^\d{4}-\d{2}-\d{2}$/.test(params.fecha) &&
    validTurnos.includes(params.turno)
  )
}
