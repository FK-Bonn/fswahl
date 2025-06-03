<script setup lang="ts">

const electionProperties = useElectionProperties();
</script>

<template>
  <div class="row mb-3">
    <label for="supervisor-name" class="col-lg-3 col-form-label">Name der Wahlleitung</label>
    <div class="col">
      <input type="text" class="form-control" id="supervisor-name" v-model="electionProperties.supervisorName">
    </div>
  </div>

  <div class="row mb-3">
    <label for="supervisor-email" class="col-lg-3 col-form-label">E-Mail-Adresse der Wahlleitung</label>
    <div class="col">
      <input type="text" class="form-control" id="supervisor-email" v-model="electionProperties.supervisorEmail">
    </div>
  </div>
</template>

<style scoped>

</style>
