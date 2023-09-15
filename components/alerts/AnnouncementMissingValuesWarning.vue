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
  if (!electionProperties.value.dateEnd && !electionProperties.value.plenum) {
    errors.push('Der letzte Wahltag')
  }
  if (!electionProperties.value.eligibleVoters) {
    errors.push('Die Anzahl der Wahlberechtigten')
  }
  if (electionProperties.value.pollingPlaces.length < 3) {
    errors.push('Urnenöffnungszeiten für alle Wahltage')
  }
  if (electionProperties.value.electoralRegisterPlaces.length < 3) {
    errors.push('Die Auslage des Wählendenverzeichnisses (mind. 3 Tage)')
  }
  if (!electionProperties.value.mainDeadline) {
    errors.push('Die gemeinsame Frist zur Einreichung von Kandidaturen, zur Einreichung von Briefwahlanträgen, und zur Einreichung von Einsprüchen gegen das Wählendenverzeichnis')
  }
  if (!electionProperties.value.countingDateTime) {
    errors.push('Der Zeitpunkt der Auszählung')
  }
  if (!electionProperties.value.countingLocationDE) {
    errors.push('Der Ort der Auszählung (deutsch)')
  }
  if (!electionProperties.value.countingLocationEN) {
    errors.push('Der Ort der Auszählung (englisch)')
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
  if (!electionProperties.value.supervisorName) {
    errors.push('Der Name der Wahlleitung')
  }
  if (!electionProperties.value.supervisorEmail) {
    errors.push('Die E-Mail-Adresse der Wahlleitung')
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
