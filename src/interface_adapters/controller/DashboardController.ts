/*
Path: src/interface_adapters/controller/DashboardController.ts
*/


import { ref, onMounted } from 'vue'
import { getDashboardData } from '../../use_cases/GetDashboardData'
import { formatChartOptions } from '../presenter/ChartPresenter'

// El presentador ahora se encarga de transformar los datos en opciones para el gráfico

export function useDashboardController() {
  const dashboard = ref<any>(null)
  const chartOptions = ref<Record<string, unknown> | null>(null)
  const loading = ref(true)
  const error = ref<unknown>(null)

  onMounted(async () => {
    try {
      dashboard.value = await getDashboardData()
  chartOptions.value = formatChartOptions(dashboard.value)
    } catch (e) {
      error.value = e
    } finally {
      loading.value = false
    }
  })

  return { dashboard, chartOptions, loading, error }
}
