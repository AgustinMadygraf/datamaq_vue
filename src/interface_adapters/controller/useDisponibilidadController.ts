/*
Composable/controller para manejar el estado, la carga y los errores de disponibilidad.
Ubicación: src/interface_adapters/controller/useDisponibilidadController.ts
*/


import { ref, onMounted } from "vue"
import { GetDisponibilidadData } from "../../use_cases/GetDisponibilidadData"
import { presentDisponibilidad } from "../presenter/DisponibilidadPresenter"
import type { Disponibilidad } from "../../entities/Disponibilidad"

export function useDisponibilidadController() {
  const disponibilidad = ref<Disponibilidad | undefined>(undefined)
  const chartOptions = ref<any | undefined>(undefined)
  const loading = ref(true)
  const error = ref<string | undefined>(undefined)

  async function fetchData() {
    loading.value = true
    error.value = undefined
    try {
      const data = await GetDisponibilidadData()
      disponibilidad.value = data
      chartOptions.value = presentDisponibilidad(data)
    } catch (e) {
      error.value = e instanceof Error ? e.message : String(e)
    } finally {
      loading.value = false
    }
  }

  onMounted(fetchData)

  return {
    disponibilidad,
    chartOptions,
    loading,
    error,
    fetchData,
  }
}
