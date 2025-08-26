import { HighchartsAdapter } from "../../infrastructure/highcharts/HighchartsAdapter"

export const HighchartsGateway = {
  createChart(container: HTMLDivElement | null, options: Record<string, unknown>) {
    return HighchartsAdapter.createChart(container, options)
  },
  updateChart(chart: any, options: Record<string, unknown>) {
    HighchartsAdapter.updateChart(chart, options)
  },
  destroyChart(chart: any) {
    HighchartsAdapter.destroyChart(chart)
  }
}
