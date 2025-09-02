/*
Presenter para adaptar los datos de disponibilidad al formato de gráfico de torta (Highcharts).
Ubicación: src/interface_adapters/presenter/DisponibilidadPresenter.ts
*/

import type { Disponibilidad } from "../../entities/Disponibilidad"

// Formato para Highcharts Pie Chart
export function presentDisponibilidad(data: Disponibilidad) {
  return {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Disponibilidad',
    },
    series: [
      {
        name: 'Porcentaje',
        colorByPoint: true,
        data: data.categories.map((cat, idx) => ({
          name: cat,
          y: data.values[idx],
        })),
      },
    ],
    tooltip: {
      pointFormat: '{series.name}: <b>{point.y}%</b>'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.y}%',
        },
      },
    },
  }
}
