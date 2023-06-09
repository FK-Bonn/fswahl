<script setup lang="ts">
import {useElectionProperties} from "~/composables/states";

const electionProperties = useElectionProperties();
const calculatedElectionProperties = computed(() => new PropertyCalculator(electionProperties.value))
</script>

<template>
  <h1>Konfiguration</h1>

  <div class="row mb-3">
    <label for="fs-name" class="col-lg-3 col-form-label">Name der Fachschaft</label>
    <div class="col-lg-9">
    <div class="input-group">
      <span class="input-group-text" id="fs-addon">Fachschaft</span>
      <input type="text" class="form-control" id="fs-name" v-model="electionProperties.fsName">
    </div>
    </div>
  </div>
  <div class="row mb-3">
    <label for="datestart" class="col-lg-3 col-form-label">Erster Wahltag</label>
    <div class="col-lg-2">
      <input type="date" class="form-control" id="datestart" v-model="electionProperties.dateStart">
    </div>
    <div class="col-lg-2 text-success">
      {{ calculatedElectionProperties.dateStartWeekday }}
    </div>
  </div>
  <div class="row mb-3">
    <label for="dateend" class="col-lg-3 col-form-label">Letzter Wahltag</label>
    <div class="col-lg-2">
      <input type="date" class="form-control" id="dateend" v-model="electionProperties.dateEnd">
    </div>
    <div class="col-lg-2 text-success">
      {{ calculatedElectionProperties.dateEndWeekday }}
    </div>
  </div>
  <div class="row mb-3">
    <label for="eligible-voters" class="col-lg-3 col-form-label">
      Anzahl der Wahlberechtigten laut Wählendenverzeichnis</label>
    <div class="col-lg-2">
      <input type="number" class="form-control" id="eligible-voters" v-model="electionProperties.voters">
    </div>
  </div>
  <div class="row mb-3" v-if="calculatedElectionProperties.checkAlwaysFSV">
    <span>Schreibt die Fachschaftssatzung bei bis zu 500 Mitgliedern die Wahl einer Fachschaftsvertretung vor?</span>
    <div class="form-check ms-3">
      <input class="form-check-input" type="radio" name="always-fsv" id="always-fsv-no"
             v-bind:value="false" v-model="electionProperties.alwaysFsv">
      <label class="form-check-label" for="always-fsv-no">
        Nein
      </label>
    </div>
    <div class="form-check ms-3">
      <input class="form-check-input" type="radio" name="always-fsv" id="always-fsv-yes"
             v-bind:value="true" v-model="electionProperties.alwaysFsv">
      <label class="form-check-label" for="always-fsv-yes">
        Ja
      </label>
    </div>
  </div>
  <div class="row mb-3" v-if="calculatedElectionProperties.checkStatutesCustomNumberOfPersons">
    <span>Schreibt die Fachschaftssatzung eine fixe Anzahl an FSR-Mitgliedern vor?</span>
    <div class="form-check ms-3">
      <input class="form-check-input" type="radio" name="fsr-members-number-override"
             id="fsr-members-number-override-no" :value="false" v-model="electionProperties.fsrMembersNumberOverride">
      <label class="form-check-label" for="fsr-members-number-override-no">
        Nein
      </label>
    </div>
    <div class="form-check ms-3">
      <input class="form-check-input" type="radio" name="fsr-members-number-override"
             :value="true" id="fsr-members-number-override-yes" v-model="electionProperties.fsrMembersNumberOverride">
      <label class="form-check-label" for="fsr-members-number-override-yes">
        Ja
      </label>
    </div>
  </div>
  <div class="row mb-3" v-if="calculatedElectionProperties.electFSR && electionProperties.fsrMembersNumberOverride">
    <label for="available-seats" class="col-lg-3 col-form-label">
      Anzahl der in den FSR zu wählenden Personen laut Fachschaftssatzung (mind. 5, max. 9)</label>
    <div class="col-lg-2">
      <input type="number" class="form-control" id="available-seats" v-model="electionProperties.seats">
    </div>
  </div>

</template>

<style scoped>

</style>