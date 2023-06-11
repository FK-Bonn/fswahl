<script setup lang="ts">

const electionProperties = useElectionProperties();
</script>

<template>
  <div class="row mb-3">
    <label for="constituent-assembly-datetime" class="col-lg-3 col-form-label">Zeitpunkt der konstituierenden
      Sitzung</label>
    <div class="col-lg-2">
      <input type="datetime-local" class="form-control" id="constituent-assembly-datetime"
             v-model="electionProperties.constituentAssemblyDateTime">
    </div>
  </div>

  <div class="row mb-3">
    <label for="constituent-assembly-location" class="col-lg-3 col-form-label">Ort der konstituierenden Sitzung
      (DE)</label>
    <div class="col-lg-2">
      <input type="text" class="form-control" id="constituent-assembly-location"
             v-model="electionProperties.constituentAssemblyLocationDE">
    </div>
  </div>

  <div class="row mb-3">
    <label for="constituent-assembly-location" class="col-lg-3 col-form-label">Ort der konstituierenden Sitzung
      (EN)</label>
    <div class="col-lg-2">
      <input type="text" class="form-control" id="constituent-assembly-location"
             v-model="electionProperties.constituentAssemblyLocationEN">
    </div>
  </div>
</template>

<style scoped>

</style>
