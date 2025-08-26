/*
Path: src/use_cases/GetDashboardData.ts
*/

import { fetchDashboardData } from '../interface_adapters/gateway/DashboardApiGateway'

export async function getDashboardData() {
  const data = await fetchDashboardData()
  // Aquí puedes transformar, validar o adaptar los datos si es necesario
  return data
}
