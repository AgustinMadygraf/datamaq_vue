/*
Path: src/entities/Dashboard.ts
Modelo de dominio para los datos del dashboard
*/

export interface DashboardMeta {
  title: string
  date: string
  [key: string]: unknown
}


export interface DashboardSeries {
  name: 'hoy' | 'ayer' | 'semana_anterior'
  data: number[]
  [key: string]: unknown
}

export interface DashboardFeature {
  key: string
  value: string | number
}



export interface DashboardSeriesMap {
  hoy: DashboardSeries
  ayer: DashboardSeries
  semana_anterior: DashboardSeries
}

export interface Dashboard {
  meta: DashboardMeta
  series: DashboardSeriesMap
  features?: DashboardFeature[]
  producto?: string
}
