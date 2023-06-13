<script setup lang="ts">

const electionProperties = useElectionProperties();
const prop = computed(() => new PropertyCalculator(electionProperties.value))

const collectErrors = () => {
  const errors = [];
  if (!electionProperties.value.fsName) {
    errors.push('Der Name der Fachschaft')
  }
  if (!electionProperties.value.eligibleVoters) {
    errors.push('Die Anzahl der Wahlberechtigten')
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
