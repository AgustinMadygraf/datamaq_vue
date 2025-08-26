/*
Path: src/interface_adapters/controller/ChartController.ts
*/

import { useHighchartsComposable } from "../presenter/HighchartsComposable"

export function useChartController(props: { options: Record<string, unknown> }) {
  // Orquesta la lógica del Chart y delega la presentación al presenter
  const { container } = useHighchartsComposable(props.options)

  // Aquí se pueden agregar más métodos o estados si el Chart lo requiere
  // Ejemplo: computed para transformar datos, métodos para eventos, etc.

  return { container }
}
