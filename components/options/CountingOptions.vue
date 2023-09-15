<script setup lang="ts">

const electionProperties = useElectionProperties();
const calculatedElectionProperties = computed(() => new PropertyCalculator(electionProperties.value))
</script>

<template>
  <div class="row mb-3">
    <label for="counting-datetime" class="col-lg-3 col-form-label">Zeitpunkt der Auszählung</label>
    <div class="col-lg-2">
      <input type="datetime-local" class="form-control" id="counting-datetime"
             v-model="electionProperties.countingDateTime">
      <div id="main-deadline-help" class="form-text">
        Üblicherweise direkt am {{calculatedElectionProperties.lastElectionDay || '…'}} nach Ende der Wahl
      </div>
    </div>
  </div>

  <div class="row mb-3">
    <label for="counting-location" class="col-lg-3 col-form-label">Ort der Auszählung (DE)</label>
    <div class="col-lg-2">
      <input type="text" class="form-control" id="counting-location" v-model="electionProperties.countingLocationDE">
    </div>
  </div>

  <div class="row mb-3">
    <label for="counting-location" class="col-lg-3 col-form-label">Ort der Auszählung (EN)</label>
    <div class="col-lg-2">
      <input type="text" class="form-control" id="counting-location" v-model="electionProperties.countingLocationEN">
    </div>
  </div>
</template>

<style scoped>

</style>
