<script setup lang="ts">

const electionProperties = useElectionProperties();
const calculatedElectionProperties = computed(() => new PropertyCalculator(electionProperties.value))
</script>

<template>
  <div class="row mb-3">
    <label for="constituent-assembly-datetime" class="col-lg-3 col-form-label">Zeitpunkt der konstituierenden
      Sitzung</label>
    <div class="col-lg-2">
      <input type="datetime-local" class="form-control" id="constituent-assembly-datetime"
             v-model="electionProperties.constituentAssemblyDateTime">
      <div id="main-deadline-help" class="form-text">
        Zwischen
        <span id="konstfsvs">{{ calculatedElectionProperties.initialMeetingEarliest || '…' }}</span><br>
        und
        <span id="konstfsve">{{ calculatedElectionProperties.initialMeetingLatest || '…' }}</span>
      </div>
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
