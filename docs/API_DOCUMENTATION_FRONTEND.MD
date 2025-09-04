# Documentación Técnica: Especificación de API para Dashboard

## Documento: API para visualización de datos de producción por hora
**Versión:** 1.0  
**Fecha:** 04/09/2025  
**Estado:** Requerido  

---

## 1. Objetivo

Estandarizar el formato de respuesta del endpoint `/api/v1/dashboard` para soportar la visualización de datos de producción por hora en tres series temporales: "hoy", "ayer" y "semana anterior" en el frontend Vue/TypeScript.

## 2. Estructura de datos requerida

### 2.1. Formato JSON de respuesta

```json
{
  "meta": {
    "title": "Dashboard de Producción",
    "date": "2025-09-04"
  },
  "series": {
    "hoy": {
      "data": [valor1, valor2, ..., valor24]
    },
    "ayer": {
      "data": [valor1, valor2, ..., valor24]
    },
    "semana_anterior": {
      "data": [valor1, valor2, ..., valor24]
    }
  },
  "features": [
    {
      "key": "total_produccion",
      "value": "1500"
    },
    {
      "key": "eficiencia",
      "value": "85%"
    }
  ],
  "producto": {
    "nombre": "Producto X",
    "codigo": "PX001"
  }
}
```

### 2.2. Definición de campos

| Campo | Tipo | Descripción | Requerido |
|-------|------|-------------|-----------|
| `meta` | Objeto | Metadatos del dashboard | Sí |
| `meta.title` | String | Título del dashboard | Sí |
| `meta.date` | String (YYYY-MM-DD) | Fecha de referencia | Sí |
| `series` | Objeto | Contiene las tres series temporales | Sí |
| `series.hoy` | Objeto | Datos del día actual | Sí |
| `series.hoy.data` | Array[24] | 24 valores numéricos (uno por hora, 00:00 a 23:00) | Sí |
| `series.ayer` | Objeto | Datos del día anterior | Sí |
| `series.ayer.data` | Array[24] | 24 valores numéricos (uno por hora, 00:00 a 23:00) | Sí |
| `series.semana_anterior` | Objeto | Datos del mismo día de la semana anterior | Sí |
| `series.semana_anterior.data` | Array[24] | 24 valores numéricos (uno por hora, 00:00 a 23:00) | Sí |
| `features` | Array | Métricas adicionales (opcional) | No |
| `producto` | Objeto | Información del producto (opcional) | No |

## 3. Implementación en FastAPI

### 3.1. Modelo Pydantic

```python
from typing import Dict, List, Optional, Any
from pydantic import BaseModel, Field
from datetime import date

class SeriesData(BaseModel):
    data: List[float] = Field(..., min_items=24, max_items=24, description="24 valores por hora")

class Feature(BaseModel):
    key: str
    value: str

class DashboardMeta(BaseModel):
    title: str
    date: str

class ProductoInfo(BaseModel):
    nombre: str = ""
    codigo: str = ""

class DashboardResponse(BaseModel):
    meta: DashboardMeta
    series: Dict[str, SeriesData] = Field(..., example={
        "hoy": {"data": [0]*24},
        "ayer": {"data": [0]*24},
        "semana_anterior": {"data": [0]*24}
    })
    features: List[Feature] = []
    producto: Dict[str, Any] = {}
```

### 3.2. Endpoint en FastAPI

```python
from fastapi import APIRouter, HTTPException
from datetime import datetime, timedelta
import numpy as np

router = APIRouter()

@router.get("/api/v1/dashboard", response_model=DashboardResponse)
async def get_dashboard():
    today = datetime.now().date()
    yesterday = today - timedelta(days=1)
    last_week = today - timedelta(days=7)
    
    # Aquí obtendrías los datos reales de tu base de datos o servicio
    # Este es un ejemplo con datos aleatorios
    return {
        "meta": {
            "title": "Dashboard de Producción",
            "date": today.strftime("%Y-%m-%d")
        },
        "series": {
            "hoy": {
                "data": [float(x) for x in np.random.randint(50, 100, 24)]
            },
            "ayer": {
                "data": [float(x) for x in np.random.randint(40, 90, 24)]
            },
            "semana_anterior": {
                "data": [float(x) for x in np.random.randint(30, 80, 24)]
            }
        },
        "features": [
            {"key": "total_produccion", "value": "1500"},
            {"key": "eficiencia", "value": "85%"}
        ],
        "producto": {
            "nombre": "Producto X",
            "codigo": "PX001"
        }
    }
```

## 4. Notas importantes para la implementación

1. **Arrays de 24 elementos:** Cada serie (`hoy`, `ayer`, `semana_anterior`) **debe** contener exactamente 24 valores numéricos, representando cada hora del día (00:00 a 23:00).

2. **Datos parciales:** Para la serie `hoy`, si aún no se han registrado datos para todas las horas, completar con `null` o `0` las horas futuras.

3. **Consistencia en los nombres de las claves:** Usar exactamente `"hoy"`, `"ayer"`, y `"semana_anterior"` como claves dentro del objeto `series`.

4. **Validación:** El endpoint debe validar que cada serie tenga exactamente 24 valores antes de enviar la respuesta.

## 5. Casos de prueba

### Caso 1: Día completo
- Datos para las 24 horas en las tres series.

### Caso 2: Día parcial
- Serie `hoy` con datos hasta la hora actual, resto nulos.
- Series `ayer` y `semana_anterior` completas.

### Caso 3: Sin datos para alguna serie
- Si no hay datos para alguna serie, enviar array de 24 ceros o nulos, pero mantener la estructura.

## 6. Depuración

Para facilitar la depuración durante el desarrollo, se puede añadir un endpoint de prueba:

```python
@router.get("/api/v1/dashboard/test")
async def test_dashboard():
    # Implementación similar a la anterior pero con patrones de datos predecibles
    return {
        "meta": {"title": "Test Dashboard", "date": "2025-09-04"},
        "series": {
            "hoy": {"data": [i*5 for i in range(24)]},
            "ayer": {"data": [i*4 for i in range(24)]},
            "semana_anterior": {"data": [i*3 for i in range(24)]}
        }
    }
```

---

## 7. Impacto en el frontend

El frontend Vue/TypeScript está implementado con Clean Architecture y espera este formato específico para renderizar correctamente los gráficos de producción por hora. Cualquier desviación del formato requerirá modificaciones en las capas de adaptadores y presentadores del frontend.
