import { ref } from "vue"

export const title = ref("Producción por hora")
export const options = ref<Record<string, unknown>>({
  chart: { type: "line" },
  title: { text: "Velocidad de producción" },
  xAxis: { categories: ["08:00","09:00","10:00","11:00","12:00"] },
  yAxis: { title: { text: "Unidades / h" } },
  series: [
    { type: "line", name: "Línea A", data: [120,135,128,142,150] },
    { type: "line", name: "Línea B", data: [100,110,125,130,145] }
  ],
  credits: { enabled: false }
})
