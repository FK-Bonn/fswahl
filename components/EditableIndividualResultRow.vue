<script setup lang="ts">


import {IndividualResult} from "~/utils/interfaces";

const props = defineProps<{
  index: number
  item: IndividualResult
  remove: ()=>void
}>()
</script>

<template>
  <tr>
    <td>{{props.index}}</td>
    <td><input type="text" v-model="props.item.name"/></td>
    <td><input type="number" v-model="props.item.votes"/></td>
    <td><button class="btn btn-sm btn-close" @click="props.remove"></button></td>
  </tr>
</template>

<style scoped>

</style>
