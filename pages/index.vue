<script setup lang="ts">
import {useElectionProperties} from "~/composables/states";
import CountingOptions from "~/components/options/CountingOptions.vue";
import ConstituentAssemblyOptions from "~/components/options/ConstituentAssemblyOptions.vue";
import ElectionSupervisorOptions from "~/components/options/ElectionSupervisorOptions.vue";
import ValidationErrors from "~/components/alerts/ValidationErrors.vue";

const electionProperties = useElectionProperties();
const calculatedElectionProperties = computed(() => new PropertyCalculator(electionProperties.value))

const addElectoralRegisterPlace = () => {
  electionProperties.value.electoralRegisterPlaces.push({
    date: '',
    timeStart: '',
    timeEnd: '',
    locationDE: '',
    locationEN: '',
  })
}
const addPollingPlace = () => {
  electionProperties.value.pollingPlaces.push({
    date: '',
    timeStart: '',
    timeEnd: '',
    locationDE: '',
    locationEN: '',
  })
}
</script>

<template>

  <ValidationErrors/>

  <h1>Konfiguration</h1>

  <ResetButton/>

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
  <div class="row mb-3" v-if="!electionProperties.plenum">
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
      <input type="number" class="form-control" id="eligible-voters" v-model="electionProperties.eligibleVoters">
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
  <div class="row mb-3" v-if="calculatedElectionProperties.checkPlenum">
    <span>Schreibt die Fachschaftssatzung die Wahl in einer Wahlvollversammlung vor?</span>
    <div class="form-check ms-3">
      <input class="form-check-input" type="radio" name="plenum"
             id="plenum-no" :value="false" v-model="electionProperties.plenum">
      <label class="form-check-label" for="plenum-no">
        Nein
      </label>
    </div>
    <div class="form-check ms-3">
      <input class="form-check-input" type="radio" name="plenum"
             :value="true" id="plenum-yes" v-model="electionProperties.plenum">
      <label class="form-check-label" for="plenum-yes">
        Ja
      </label>
    </div>
  </div>

  <div class="row mb-3">
    <label for="main-deadline" class="col-lg-3 col-form-label">Gemeinsame Frist zur Einreichung von Kandidaturen,
      zur Einreichung von Briefwahlanträgen, und
      zur Einreichung von Einsprüchen gegen das Wählendenverzeichnis</label>
    <div class="col-lg-2">
      <input type="datetime-local" class="form-control" id="main-deadline" v-model="electionProperties.mainDeadline">
      <div id="main-deadline-help" class="form-text">
        Zwischen
        <span id="wvs">{{ calculatedElectionProperties.mainDeadlineEarliest || '…' }}</span><br>
        und
        <span id="wve">{{ calculatedElectionProperties.mainDeadlineLatest || '…' }}</span>
      </div>
    </div>
    <div class="col-lg-2 text-success">
      {{ calculatedElectionProperties.mainDeadlineWeekday }}
    </div>
  </div>

  <p>Auslegung des Wählendenverzeichnisses</p>

  <p class="text-muted">
    Mindestens drei Tage vor der gemeinsamen Frist zur Einreichung von Kandidaturen,
    zur Einreichung von Briefwahlanträgen, und
    zur Einreichung von Einsprüchen gegen das Wählendenverzeichnis.
  </p>

  <table id="wvz_table" class="table table-striped table-hover">
    <tbody>
    <tr>
      <th>Datum</th>
      <th colspan="2">Uhrzeit</th>
      <th>Ort (DE)</th>
      <th>Ort (EN)</th>
      <th></th>
    </tr>
    <template v-for="(place, index) in electionProperties.electoralRegisterPlaces">
      <EditableEventPlaceRow :item="place" :remove="()=>{electionProperties.electoralRegisterPlaces.splice(index, 1)}"/>
    </template>
    </tbody>
    <tfoot>
    <tr>
      <td colspan="5">
        <button class="btn btn-outline-secondary btn-sm" @click="addElectoralRegisterPlace">Hinzufügen</button>
      </td>
    </tr>
    </tfoot>
  </table>

  <p>Wahllokale</p>

  <p class="text-muted">
    Mindestens eins an jedem Wahltag
  </p>


  <table id="pollingplaces_table" class="table table-striped table-hover">
    <tbody>
    <tr>
      <th>Datum</th>
      <th colspan="2">Uhrzeit</th>
      <th>Ort (DE)</th>
      <th>Ort (EN)</th>
      <th></th>
    </tr>
    <template v-for="(place, index) in electionProperties.pollingPlaces">
      <EditableEventPlaceRow :item="place" :remove="()=>{electionProperties.pollingPlaces.splice(index, 1)}"/>
    </template>
    </tbody>
    <tfoot>
    <tr>
      <td colspan="5">
        <button class="btn btn-outline-secondary btn-sm" @click="addPollingPlace">Hinzufügen</button>
      </td>
    </tr>
    </tfoot>
  </table>

  <CountingOptions/>

  <ConstituentAssemblyOptions/>

  <ElectionSupervisorOptions/>


</template>

<style scoped>

</style>