<script setup lang="ts">

import {
  checkAtLeastThreeElectoralRegisterDates,
  checkConstitutiveAssemblyDate,
  checkCountingAfterElectionEnd,
  checkElectoralRegisterDatesAreWorkdays,
  checkElectoralRegisterDatesBeforeMainDeadline,
  checkFirstDayIsMonTueWed,
  checkLastDayIsWedThuFri,
  checkLastElectionDayAfterFirstElectionDay,
  checkMainDeadline, checkPollingStationExistsForEachDay, checkPollingStationsOnElectionDays,
  checkThreeToFiveDays
} from "~/utils/validation";

const electionProperties = useElectionProperties();
const prop = computed(() => new PropertyCalculator(electionProperties.value))

const collectErrors = () => {
  const errors = [];
  if(!checkLastElectionDayAfterFirstElectionDay(electionProperties.value, prop.value)){
    errors.push('Der erste Wahltag muss vor dem letzten Wahltag liegen')
  }
  if(!checkThreeToFiveDays(electionProperties.value, prop.value)){
    errors.push('Es müssen drei bis 5 Wahltage sein')
  }
  if(!checkFirstDayIsMonTueWed(electionProperties.value, prop.value)){
    errors.push('Der erste Wahltag muss auf Montag, Dienstag oder Mittwoch liegen')
  }
  if(!checkLastDayIsWedThuFri(electionProperties.value, prop.value)){
    errors.push('Der letzte Wahltag muss auf Mittwoch, Donnerstag oder Freitag liegen')
  }
  if(!checkMainDeadline(electionProperties.value)){
    errors.push('Die gemeinsame Frist zur Einreichung von Kandidaturen, zur Einreichung von Briefwahlanträgen, und zur Einreichung von Einsprüchen gegen das Wählendenverzeichnis muss zwischen dem 10. und dem 13. Tag vor dem ersten Wahltag liegen (einschließlich)')
  }
  if(!checkElectoralRegisterDatesAreWorkdays(electionProperties.value)){
    errors.push('Das Wählendenverzeichnis muss an Werktagen (Montag bis Freitag) ausgelegt werden')
  }
  if(!checkAtLeastThreeElectoralRegisterDates(electionProperties.value)){
    errors.push('Das Wählendenverzeichnis muss an mindestens drei Tagen ausgelegt werden')
  }
  if(!checkElectoralRegisterDatesBeforeMainDeadline(electionProperties.value)){
    errors.push('Das Wählendenverzeichnis muss vor der gemeinsamen Frist zur Einreichung von Kandidaturen, zur Einreichung von Briefwahlanträgen, und zur Einreichung von Einsprüchen gegen das Wählendenverzeichnis ausliegen')
  }
  if(!checkPollingStationExistsForEachDay(electionProperties.value)){
    errors.push('An jedem Wahltag muss ein Wahllokal geöffnet sein')
  }
  if(!checkPollingStationsOnElectionDays(electionProperties.value, prop.value)){
    errors.push('Die Wahllokale können nicht außerhalb der Wahltage geöffnet sein')
  }
  if(!checkCountingAfterElectionEnd(electionProperties.value, prop.value)){
    errors.push('Die Auszählung kann frühestens am letzten Wahltag stattfinden')
  }
  if(!checkConstitutiveAssemblyDate(electionProperties.value, prop.value)){
    errors.push('Die konstituierende Sitzung muss zwischen dem 5. und dem 14. Tag nach dem letzten Wahltag liegen (einschließlich)')
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
