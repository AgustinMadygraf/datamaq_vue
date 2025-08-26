<script setup lang="ts">
import { useHighchartsComposable } from "../interface_adapters/presenter/HighchartsComposable"

const props = defineProps<{ options: Record<string, unknown> }>()
const { container } = useHighchartsComposable(props.options)
</script>

<template>
  <div ref="container" class="w-100" style="min-height:320px"></div>
</template>
