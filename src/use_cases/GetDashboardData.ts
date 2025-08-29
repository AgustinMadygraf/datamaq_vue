/*
Path: src/use_cases/GetDashboardData.ts
*/

import { fetchDashboardData } from '../interface_adapters/gateway/DashboardApiGateway'
import type { Dashboard } from '../entities/Dashboard'

export async function getDashboardData(): Promise<Dashboard> {
  const raw = await fetchDashboardData()
  // Adaptar los datos crudos a la entidad Dashboard
  const dashboard: Dashboard = {
    meta: {
      title: raw?.meta?.title ?? '',
      date: raw?.meta?.date ?? '',
      ...raw?.meta
    },
    series: Array.isArray(raw?.series)
      ? raw.series.map((s: any) => ({
          name: s.name ?? '',
          data: Array.isArray(s.data) ? s.data : [],
          ...s
        }))
      : [],
    features: Array.isArray(raw?.features)
      ? raw.features.map((f: any) => ({
          key: f.key ?? '',
          value: f.value ?? ''
        }))
      : [],
    producto: raw?.producto ?? ''
  }
  return dashboard
}
