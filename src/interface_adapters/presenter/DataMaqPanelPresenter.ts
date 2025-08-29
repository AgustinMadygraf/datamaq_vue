/*
Path: src/interface_adapters/presenter/DataMaqPanelPresenter.ts
Responsabilidad: Transformar los datos del dashboard en props listos para la UI de DataMaqPanel.vue
*/

import type { Dashboard } from '../../entities/Dashboard'

export function getInfoDisplayProps(dashboard: Dashboard | null) {
  // Ajuste: producto puede ser string o un objeto con formato y web_width_mm
  let formato = ''
  let anchoBobina = ''
  if (dashboard?.producto && typeof dashboard.producto === 'object') {
    const prod: any = dashboard.producto
    if (prod.formato) {
      formato = `${prod.formato.height_mm ?? ''} X ${prod.formato.width_mm ?? ''} X ${prod.formato.gusset_mm ?? ''}`
    }
    if (prod.web_width_mm) {
      anchoBobina = prod.web_width_mm.toString()
    }
  }
  return {
    velocidad:
      dashboard?.features?.find(f => f.key === 'velocidad_ultima_bpm')?.value?.toString() ?? '',
    formato,
    anchoBobina,
  }
}
