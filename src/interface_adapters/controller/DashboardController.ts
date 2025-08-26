/*
Path: src/interface_adapters/controller/DashboardController.ts
*/

import { ref, onMounted } from 'vue'
import { getDashboardData } from '../../use_cases/GetDashboardData'

export function useDashboardController() {
  const dashboard = ref<any>(null)
  const loading = ref(true)
  const error = ref<unknown>(null)

  onMounted(async () => {
    try {
      dashboard.value = await getDashboardData()
    } catch (e) {
      error.value = e
    } finally {
      loading.value = false
    }
  })

  return { dashboard, loading, error }
}
