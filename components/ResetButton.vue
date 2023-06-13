<script setup lang="ts">

import {initialValue} from "~/composables/states";

const electionProperties = useElectionProperties();
const resetElection = () => {
  electionProperties.value = initialValue();
}
</script>

<template>
  <div class="d-print-none mb-2">
    <button class="btn btn-primary" @click="resetElection">Zurücksetzen</button>
  </div>
</template>

<style scoped>

</style>
