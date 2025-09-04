/*
Path: src/interface_adapters/presenter/ChartPresenter.ts
*/

/**
 * Transforma los datos crudos del dashboard en opciones para Highcharts
 * - Solo 24 horas (00:00 a 23:59)
 * - Tres líneas: hoy (rojo), ayer (verde claro), semana anterior (azul marino)
 */
export function formatChartOptions(raw: any): Record<string, unknown> {
  try {
    // Generar categorías de 5 minutos: 00:00, 00:05, ..., 23:55
    const categories = Array.from({ length: 288 }, (_, i) => {
      const h = Math.floor(i / 12).toString().padStart(2, '0')
      const m = ((i % 12) * 5).toString().padStart(2, '0')
      return `${h}:${m}`
    })

    // Helper para obtener serie por nombre y normalizar a 288 valores
    function getSeriesData(name: 'hoy' | 'ayer' | 'semana_anterior'): number[] {
      const serie = raw?.series?.[name]
      const data = Array(288).fill(null)
      if (serie && Array.isArray(serie.data)) {
        for (let i = 0; i < Math.min(serie.data.length, 288); i++) {
          data[i] = serie.data[i]
        }
      }
      return data
    }

    // Definir las tres series con colores y etiquetas
    const series = [
      {
        type: 'line',
        name: 'Hoy',
        color: '#d32f2f', // rojo
        data: getSeriesData('hoy'),
        dashStyle: 'Solid',
        marker: { enabled: true, symbol: 'circle', fillColor: '#d32f2f' }
      },
      {
        type: 'line',
        name: 'Ayer',
        color: '#81c784', // verde claro
        data: getSeriesData('ayer'),
        dashStyle: 'ShortDash',
        marker: { enabled: true, symbol: 'circle', fillColor: '#81c784' }
      },
      {
        type: 'line',
        name: 'Semana anterior',
        color: '#283593', // azul marino
        data: getSeriesData('semana_anterior'),
        dashStyle: 'Dot',
        marker: { enabled: true, symbol: 'circle', fillColor: '#283593' }
      }
    ]

    return {
      chart: { type: 'line' },
      title: { text: 'Producción cada 5 minutos (24h)' },
      xAxis: {
        categories,
        title: { text: 'Hora' }
      },
      yAxis: {
        title: { text: 'Unidades producidas' }
      },
      series,
      credits: { enabled: false },
      accessibility: { enabled: false }
    }
  } catch (err) {
    console.error('Error al formatear opciones del gráfico:', err)
    console.warn('Datos recibidos:', raw)
    // Devolver opciones por defecto para evitar romper la UI
    return {
      chart: { type: 'line' },
      title: { text: 'No hay datos disponibles' },
      series: []
    }
  }
}
