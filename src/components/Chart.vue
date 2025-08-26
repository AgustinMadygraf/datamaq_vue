<script setup lang="ts">
import { useHighchartsGateway } from "../interface_adapters/gateway/HighchartsGateway"

const props = defineProps<{ options: Record<string, unknown> }>()
const { container } = useHighchartsGateway(props.options)
</script>

<template>
  <div ref="container" class="w-100" style="min-height:320px"></div>
</template>
