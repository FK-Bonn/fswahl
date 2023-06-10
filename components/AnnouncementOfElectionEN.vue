<script setup lang="ts">
import {PropertyCalculatorEN} from "~/utils/deadlines";

const electionProperties = useElectionProperties();
const prop = computed(() => new PropertyCalculatorEN(electionProperties.value))
</script>

<template>

  <h1>Announcement of Election</h1>

  <h2>Election of student representatives (<span class="fsvfsr">{{ prop.committeeName }}</span>) for the Fachschaft
    <span
        class="fachschaft">{{ electionProperties.fsName }}</span></h2>

  <p>The student representatives (<span class="fsvfsr">{{ prop.committeeName }}</span>) for the Fachschaft<span
      class="fachschaft">{{ electionProperties.fsName }}</span>
    at the university of Bonn will be elected.</p>

  <p><b><span class="zahl_sitze">{{ prop.seats }}</span> representatives</b> will be elected in total.</p>

  <p>The election will take place <span class="wahlzeitraum_engl">
    from {{ prop.firstElectionDay }} to {{ prop.lastElectionDay }}</span></p>

  <h3>Polling Stations</h3>

  <p>For information regarding the polling station please look at the list below:</p>

  <table id="urnenstandorte_table" class="table table-striped table-hover">
    <thead>
    <tr>
      <th>Date</th>
      <th colspan="2">Time</th>
      <th>Location</th>
    </tr>
    </thead>
    <tbody>
    <template v-for="pollingPlace in electionProperties.pollingPlaces">
      <EventPlaceRowEN :event-place="pollingPlace"/>
    </template>
    </tbody>
  </table>

  <h3>Candidacies</h3>

  <p><b>If you want to use a sample please contact the election supervisor. The use of a sample is
    recommended.</b></p>

  <p>Candidacies must be handed to the election supervisor until <b><span
      class="frist_einreichung_wahlvorschlaege">{{ prop.mainDeadlineDate }}</span></b> at <b><span
      class="frist_einreichung_wahlvorschlaege_uhrzeit">{{ prop.mainDeadlineTime }}</span></b>.</p>

  <p>The candidacy must at least contain the following aspects: name, surname, how the name should be written on the
    ballot, address, email address, matriculation number, the title of the election, and a signature.</p>

  <p>The candidacy must be written in German.</p>

  <p>For further informations on the requirements please refer to §14 FSWO (cf.
    http://sp.uni-bonn.de/dokumente/idx/Ordnungen/FSWO.html#§14)</p>


  <h3>Voting system</h3>

  <p> The Fachschaft forms a constituency. Everybody who is eligible to vote can vote for one candidate.</p>

  <p> The people with the most votes and at least one vote are elected.</p>

  <p> If two candidates got the same amount of votes the election supervisor will decide the order by lot.</p>

  <p> If an elected person resigns the seat will be fill with the person that got the most votes and at least one
    and is not a member of the representatives yet. If every elected person is a member of the representatives the
    seat will not be filled again.</p>

  <p> If at one point more than half of the seats are unoccupied new elections will be held as soon as possible.
    The chairperson of the FSR immediately summons a meeting of the FSVV which decides on a new date and a new
    election committee. </p>


  <h3>Electoral register</h3>

  <p>Every member of the Fachschaft <span class="fachschaft">{{ electionProperties.fsName }}</span>
    at the university of Bonn by <b><span class="frist_wahlberechtigung">{{ prop.eligibilityDeadline }}</span></b> is
    eligible to vote and to be elected.
    If you are a member of multiple student bodies, you are only eligible to vote for a single one.
    The corresponding subject is marked on the back of your student ID with a star (*).
    Visiting students are not eligible to vote.</p>

  <p>Everyone who is listed in the electoral register is eligible to vote.</p>

  <p>The electoral register can be consulted at the following times and places:</p>


  <table id="wvz_table" class="table table-striped table-hover">
    <thead>
    <tr>
      <th>Date</th>
      <th colspan="2">Time</th>
      <th>Location</th>
    </tr>
    </thead>
    <tbody>
    <template v-for="place in electionProperties.electoralRegisterPlaces">
      <EventPlaceRowEN :event-place="place"/>
    </template>
    </tbody>
  </table>

  <p>Objections to the accuracy of the electoral register can be raised during the time listed above, but no later
    than the <b><span class="frist_einreichung_wahlvorschlaege">{{ prop.mainDeadlineDate }}</span></b> at <b><span
        class="frist_einreichung_wahlvorschlaege_uhrzeit">{{ prop.mainDeadlineTime }}</span></b>. They need to be
    submitted to the
    election supervisor. </p>


  <h3>Vote by Mail</h3>

  <p>In exceptional cases a reasoned request for vote by mail can be submitted. The request must be justified
    and handed in in written form. It must include your name, address and matriculation number.</p>

  <p>Requests for vote by mail must be handed in until <b><span
      class="frist_einreichung_wahlvorschlaege">{{ prop.mainDeadlineDate }}</span> at <span
      class="frist_einreichung_wahlvorschlaege_uhrzeit">{{ prop.mainDeadlineTime }}</span></b>. The request must be
    submitted to the
    election supervisor. Every postal voter needs to get his postal voting documents until 24 hours before the
    election from the election supervisor. Postal voters who can't get their documents in person can request to
    get them send.</p>


  <h3>Counting</h3>

  <p>The public counting will take place on the <span class="datum_auszaehlung">{{ prop.countingDate }}</span> at <span
      class="uhrzeit_auszaehlung">{{ prop.countingTime }}</span> <span
      class="ort_auszaehlung_engl">{{ electionProperties.countingLocationEN }}</span></p>


  <h3>Constituent assembly</h3>

  <p>The constituent assembly will take place on the <span
      class="datum_konstituierende_sitzung">{{ prop.constituentAssemblyDate }}</span>
    <span class="uhrzeit_konstituierende_sitzung">{{ prop.constituentAssemblyTime }}</span> <span
        class="ort_konstituierende_sitzung_engl">{{ electionProperties.constituentAssemblyLocationEN }}</span>
  </p>

  <h3>Election supervisor</h3>

  <p>The election is organized by <b><span class="wahlleitung">{{ electionProperties.supervisorName }}</span></b>.</p>
  <p>Contact: <span class="wahlleitungkontakt">{{ electionProperties.supervisorEmail }}</span></p>


</template>

<style scoped>

</style>