/*
Path: src/interface_adapters/controller/DashboardController.ts
*/

import { ref, onMounted } from 'vue'
import { getDashboardData } from '../../use_cases/GetDashboardData'

function transformToChartOptions(data: any) {
  // Ejemplo: transformar series y meta en opciones Highcharts
  return {
    chart: { type: 'line' },
    title: { text: 'Dashboard Producción' },
    xAxis: {
      categories: data.series?.map((item: any) => item.t) ?? [],
      title: { text: 'Fecha/Hora' }
    },
    yAxis: {
      title: { text: 'Contadores' }
    },
    series: [
      {
        type: 'line',
        name: 'hr_counter1',
        data: data.series?.map((item: any) => item.hr_counter1) ?? []
      },
      {
        type: 'line',
        name: 'hr_counter2',
        data: data.series?.map((item: any) => item.hr_counter2) ?? []
      }
    ],
    credits: { enabled: false },
    accessibility: { enabled: false }
  }
}

export function useDashboardController() {
  const dashboard = ref<any>(null)
  const chartOptions = ref<Record<string, unknown> | null>(null)
  const loading = ref(true)
  const error = ref<unknown>(null)

  onMounted(async () => {
    try {
      dashboard.value = await getDashboardData()
      chartOptions.value = transformToChartOptions(dashboard.value)
    } catch (e) {
      error.value = e
    } finally {
      loading.value = false
    }
  })

  return { dashboard, chartOptions, loading, error }
}
