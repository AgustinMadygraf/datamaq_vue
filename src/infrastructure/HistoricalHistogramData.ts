/*
Path: src/infrastructure/HistoricalHistogramData.ts
Datos históricos de ejemplo para el histograma (fallback local)
*/

export const historicalHistogramData = {
  meta: {
    title: 'Histograma de Producción (Histórico)',
    date: '2025-09-01',
    fuente: 'local'
  },
  bins: [
    { label: '0-10', value: 5 },
    { label: '11-20', value: 12 },
    { label: '21-30', value: 8 },
    { label: '31-40', value: 3 },
    { label: '41-50', value: 1 }
  ],
  features: [
    { key: 'máquina', value: 'A1' },
    { key: 'turno', value: 'Noche' }
  ],
  producto: 'Producto X'
}
