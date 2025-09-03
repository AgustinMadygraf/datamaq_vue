/*
Entidad de dominio para los datos de disponibilidad (gráfico de torta)
Ubicación: src/entities/Disponibilidad.ts
*/

export type ParoTipo = "PROGRAMADO" | "NO_PROGRAMADO"

export type RazonParoProgramado =
  | "SETUP_CAMBIO_FORMATO"
  | "MANTENIMIENTO_PLANIFICADO"
  | "CAPACITACION"
  | "REUNION"
  | "SIN_ORDEN_TRABAJO"

export type RazonParoNoProgramado =
  | "ROTURA"
  | "FALTA_MATERIA_PRIMA"
  | "FALTA_MAQUINISTA"
  | "FALTA_DOTACION"
  | "ESPERA_CALIDAD"
  | "CORTE_ENERGIA"
  | "OTROS"

export type RazonParo = RazonParoProgramado | RazonParoNoProgramado

export interface ParoEvent {
  start: string // ISO
  end: string   // ISO
  minutes: number
  tipo: ParoTipo
  razon: RazonParo
  notes?: string
}

export interface Disponibilidad {
  period: { start: string; end: string; minutesTotal: number }
  minutes: {
    operating: number
    plannedDowntime: number
    unplannedDowntime: number
  }
  availability: number // operating / minutesTotal (0..1)
  breakdown?: {
    planned?: Partial<Record<RazonParoProgramado, number>> // minutos por razón
    unplanned?: Partial<Record<RazonParoNoProgramado, number>>
  }
  events?: ParoEvent[] // opcional: para auditoría fina
}
