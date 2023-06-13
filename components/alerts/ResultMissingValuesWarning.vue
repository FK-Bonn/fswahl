<script setup lang="ts">

const electionProperties = useElectionProperties();
const prop = computed(() => new PropertyCalculator(electionProperties.value))

const collectErrors = () => {
  const errors = [];
  if (!electionProperties.value.fsName) {
    errors.push('Der Name der Fachschaft')
  }
  if (!electionProperties.value.dateStart) {
    errors.push('Der erste Wahltag')
  }
  if (!electionProperties.value.dateEnd || !electionProperties.value.plenum) {
    errors.push('Der letzte Wahltag')
  }
  if (!electionProperties.value.eligibleVoters) {
    errors.push('Die Anzahl der Wahlberechtigten')
  }
  if (!electionProperties.value.invalidVotes && electionProperties.value.invalidVotes !== 0) {
    errors.push('Die Anzahl der ungültigen Stimmen')
  }
  if (!electionProperties.value.resultLocation) {
    errors.push('Der Ort der Veröffentlichung des Wahlergebnisses')
  }
  if (!electionProperties.value.resultDate) {
    errors.push('Das Datum der Veröffentlichung des Wahlergebnisses')
  }
  if (electionProperties.value.votes.length < 1) {
    errors.push('Einzelergebnisse')
  }
  if (!electionProperties.value.constituentAssemblyDateTime) {
    errors.push('Der Zeitpunkt der konstituierenden Sitzung')
  }
  if (!electionProperties.value.constituentAssemblyLocationDE) {
    errors.push('Der Ort der konstituierenden Sitzung (deutsch)')
  }
  if (!electionProperties.value.constituentAssemblyLocationEN) {
    errors.push('Der Ort der konstituierenden Sitzung (englisch)')
  }
  return errors;
}

const errors = computed(() => collectErrors())
</script>

<template>
  <template v-if="errors.length">
    <div class="alert alert-warning" role="alert">
      <h4 class="alert-heading">Hoppla…</h4>
      <p>Ein paar Felder müssen noch konfiguriert werden ^-^</p>
      <hr>
      <ul>
        <template v-for="error in errors">
          <li>{{ error }}</li>
        </template>
      </ul>
    </div>
  </template>
</template>

<style scoped>

</style>
