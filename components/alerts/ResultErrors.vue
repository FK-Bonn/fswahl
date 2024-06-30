<script setup lang="ts">

import {checkCandidatesAreOrderedByVotes} from "~/utils/validation";

const electionProperties = useElectionProperties();
const prop = computed(() => new PropertyCalculator(electionProperties.value))

const collectErrors = () => {
  const errors = [];
  if(!checkCandidatesAreOrderedByVotes(electionProperties.value, prop.value)){
    errors.push('Die Kandidierenden müssen nach Stimmzahl absteigend sortiert werden')
  }
  return errors;
}

const errors = computed(() => collectErrors())
</script>

<template>
  <template v-if="errors.length">
    <div class="alert alert-danger" role="alert">
      <h4 class="alert-heading">Fehler</h4>
      <p>Das geht so nicht!</p>
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
