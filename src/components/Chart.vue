<script setup lang="ts">
import { defineProps } from "vue"
import { useHighcharts } from "../chartSetup"

const props = defineProps<{ options: Record<string, unknown> }>()
const { container } = useHighcharts(props.options)
</script>

<template>
  <div ref="container" class="w-100" style="min-height:320px"></div>
</template>
