<script setup lang="ts">

import {FORBIDDEN_DATES} from "~/utils/forbidden-dates";

const lastForbiddenDate = FORBIDDEN_DATES.map((item) => item.end).sort().at(-1) || '1970-01-01';
const today = new Date().toISOString().substring(0, 10);
</script>

<template>
  <template v-if="today > lastForbiddenDate">
    <div class="alert alert-warning" role="alert">
      <h4 class="alert-heading">Warnung</h4>
      <p>Die Liste der unzulässigen Wahltage ist veraltet.</p>
      <p>Heute ist {{today}}, der letzte eingetragene unzulässige Wahltag ist jedoch der {{lastForbiddenDate}}.</p>
      <p>Bitte <code>utils/forbidden-dates.ts</code> aktualisieren.</p>
    </div>
  </template>
</template>

<style scoped>

</style>
