import { onMounted, onBeforeUnmount, ref, watch, toRaw } from "vue"

export function useHighchartsGateway(options: Record<string, unknown>) {
  const container = ref<HTMLDivElement | null>(null)
  let chart: any

  onMounted(() => {
    const H = (window as any).Highcharts
    if (!H) {
      console.error("Highcharts no está cargado. Verificá el <script src='https://code.highcharts.com/highcharts.js'> en index.html.")
      return
    }
    chart = H.chart(container.value!, toRaw(options))
  })

  watch(
    () => options,
    (opts) => {
      if (chart && opts) chart.update(toRaw(opts), true, true)
    },
    { deep: true }
  )

  onBeforeUnmount(() => { if (chart) chart.destroy() })

  return { container }
}
