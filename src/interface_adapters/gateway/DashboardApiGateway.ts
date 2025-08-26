/*
Path: src/interface_adapters/gateway/DashboardApiGateway.ts
*/

export async function fetchDashboardData(): Promise<any> {
  const response = await fetch('/datamaq_php/backend/api/v1/dashboard.php')
  if (!response.ok) throw new Error('Error al obtener datos del dashboard')
  return await response.json()
}
