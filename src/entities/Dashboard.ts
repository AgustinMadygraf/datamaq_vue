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
  name: string
  data: number[]
  [key: string]: unknown
}

export interface DashboardFeature {
  key: string
  value: string | number
}

export interface Dashboard {
  meta: DashboardMeta
  series: DashboardSeries[]
  features?: DashboardFeature[]
  producto?: string
}
