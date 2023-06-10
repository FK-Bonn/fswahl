<script setup lang="ts">
import {EventPlace} from "~/utils/interfaces";

const props = defineProps<{
  eventPlace: EventPlace
}>()

</script>

<template>
  <tr>
    <td>{{ dateEN(props.eventPlace.date) }}</td>
    <td>from {{ props.eventPlace.timeStart }}</td>
    <td>until {{ props.eventPlace.timeEnd }}</td>
    <td>{{ props.eventPlace.locationEN }}</td>
  </tr>
</template>

<style scoped>

</style>