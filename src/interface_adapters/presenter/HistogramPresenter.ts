/*
Path: src/interface_adapters/presenter/HistogramPresenter.ts
Presentador para adaptar los datos del histograma al formato requerido por el componente de gráfico
*/

import type { Histogram } from '../../entities/Histogram'

export function presentHistogram(histogram: Histogram) {
  // Ejemplo: adaptar a formato Highcharts
  return {
    chart: {
      type: 'column',
      backgroundColor: '#fff'
    },
    title: {
      text: histogram.meta.title || 'Histograma'
    },
    xAxis: {
      categories: histogram.bins.map(bin => bin.label),
      title: { text: 'Categoría' }
    },
    yAxis: {
      min: 0,
      title: { text: 'Valor' }
    },
    series: [
      {
        name: histogram.meta.title || 'Histograma',
        data: histogram.bins.map(bin => bin.value)
      }
    ]
  }
}
