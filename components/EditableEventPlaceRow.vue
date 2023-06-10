<script setup lang="ts">

import {EventPlace} from "~/utils/interfaces";

const props = defineProps<{
  item: EventPlace
  remove: ()=>void
}>()
</script>

<template>
  <tr>
    <td><input type="date" v-model="props.item.date"/></td>
    <td>von <input type="time" v-model="props.item.timeStart"/></td>
    <td>bis <input type="time" v-model="props.item.timeEnd"/></td>
    <td><input type="text" v-model="props.item.locationDE"/></td>
    <td><input type="text" v-model="props.item.locationEN"/></td>
    <td><button class="btn btn-sm btn-close" @click="props.remove"></button></td>
  </tr>
</template>

<style scoped>

</style>