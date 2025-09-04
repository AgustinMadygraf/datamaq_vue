/*
Path: src/use_cases/GetDashboardData.ts
*/

import { fetchDashboardData } from '../interface_adapters/gateway/DashboardApiGateway'
import type { Dashboard, DashboardSeries } from '../entities/Dashboard'

export async function getDashboardData(): Promise<Dashboard> {
  const raw = await fetchDashboardData()
  // Adaptar los datos crudos a la entidad Dashboard con series tipadas
    try {
      const raw = await fetchDashboardData()
      console.info('[GetDashboardData] Datos crudos recibidos del gateway:', raw)
      // Adaptar los datos crudos a la entidad Dashboard con series tipadas
      let series: { hoy: DashboardSeries; ayer: DashboardSeries; semana_anterior: DashboardSeries }
      if (Array.isArray(raw?.series) && raw.series.length && raw.series[0].t) {
        console.debug('[GetDashboardData] Transformando formato histórico por hora.')
        series = buildSeriesFromHourly(raw.series)
      } else {
        console.debug('[GetDashboardData] Transformando formato series con nombre.')
        series = {
          hoy: findSeries('hoy'),
          ayer: findSeries('ayer'),
          semana_anterior: findSeries('semana_anterior')
        }
      }

      const dashboard: Dashboard = {
        meta: {
          title: raw?.meta?.title ?? '',
          date: raw?.meta?.date ?? '',
          ...raw?.meta
        },
        series,
        features: Array.isArray(raw?.features)
          ? raw.features.map((f: any) => ({
              key: f.key ?? '',
              value: f.value ?? ''
            }))
          : [],
        producto: raw?.producto ?? ''
      }
      console.info('[GetDashboardData] Entidad Dashboard generada:', dashboard)
      return dashboard
    } catch (err) {
      console.error('Error al transformar los datos del dashboard:', err)
      console.warn('Datos crudos recibidos:', raw ?? null)
      // Retornar dashboard vacío para evitar romper la UI
      return {
        meta: { title: '', date: '' },
        series: {
          hoy: { name: 'hoy', data: [] },
          ayer: { name: 'ayer', data: [] },
          semana_anterior: { name: 'semana_anterior', data: [] }
        },
        features: [],
        producto: ''
      }
    }

  // Si el formato es array de objetos por hora (histórico), construir las tres series
  function buildSeriesFromHourly(rawSeries: any[]): { hoy: DashboardSeries; ayer: DashboardSeries; semana_anterior: DashboardSeries } {
    // Suponiendo que cada objeto tiene t (timestamp), hr_counter1, hr_counter2, etc.
    // Para demo, asignamos todos los hr_counter1 a 'hoy', hr_counter2 a 'ayer', y la suma a 'semana_anterior'
    const hoyData = rawSeries.map((item: any) => item.hr_counter1 ?? null)
    const ayerData = rawSeries.map((item: any) => item.hr_counter2 ?? null)
    const semanaAnteriorData = rawSeries.map((item: any) => ((item.hr_counter1 ?? 0) + (item.hr_counter2 ?? 0)) || null)
    return {
      hoy: { name: 'hoy', data: hoyData },
      ayer: { name: 'ayer', data: ayerData },
      semana_anterior: { name: 'semana_anterior', data: semanaAnteriorData }
    }
  }

  // Si el formato es array de series con nombre, usar el mapeo original
  function findSeries(name: 'hoy' | 'ayer' | 'semana_anterior'): DashboardSeries {
    if (Array.isArray(raw?.series) && raw.series.length && raw.series[0].name) {
      const serie = raw.series.find((s: any) => s.name === name)
      return {
        name,
        data: Array.isArray(serie?.data) ? serie.data : [],
        ...serie
      }
    }
    // Si no existe, devolver vacío
    return { name, data: [] }
  }

  let series: { hoy: DashboardSeries; ayer: DashboardSeries; semana_anterior: DashboardSeries }
  if (Array.isArray(raw?.series) && raw.series.length && raw.series[0].t) {
    // Formato histórico: array de objetos por hora
    series = buildSeriesFromHourly(raw.series)
  } else {
    // Formato array de series con nombre
    series = {
      hoy: findSeries('hoy'),
      ayer: findSeries('ayer'),
      semana_anterior: findSeries('semana_anterior')
    }
  }

  const dashboard: Dashboard = {
    meta: {
      title: raw?.meta?.title ?? '',
      date: raw?.meta?.date ?? '',
      ...raw?.meta
    },
    series,
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
