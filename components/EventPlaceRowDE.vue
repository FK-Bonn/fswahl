<script setup lang="ts">
import {EventPlace} from "~/utils/interfaces";

const props = defineProps<{
  eventPlace: EventPlace
}>()

</script>

<template>
  <tr>
    <td>{{ dateDE(props.eventPlace.date) }}</td>
    <td>von {{ props.eventPlace.timeStart }} Uhr</td>
    <td>bis {{ props.eventPlace.timeEnd }} Uhr</td>
    <td>{{ props.eventPlace.locationDE }}</td>
  </tr>
</template>

<style scoped>

</style>