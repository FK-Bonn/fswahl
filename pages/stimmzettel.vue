<script setup lang="ts">

import InfoAlert from "~/components/options/InfoAlert.vue";
import BallotMissingValuesWarning from "~/components/alerts/BallotMissingValuesWarning.vue";

const electionProperties = useElectionProperties();
const propDE = computed(() => new PropertyCalculator(electionProperties.value))
const propEN = computed(() => new PropertyCalculatorEN(electionProperties.value))
const addCandidate = () => {
  electionProperties.value.candidates.push('')
}
</script>

<template>
  <PrintButton/>
  <div class="d-print-none mb-4">
    <h1>Stimmzettel</h1>

    <BallotMissingValuesWarning/>

    <template v-if="electionProperties.plenum">
      <InfoAlert class="mt-3">
        Bei der Wahl in einer Wahlvollversammlung enthält der Stimmzettel ausschließlich ein Freifeld.
      </InfoAlert>
    </template>

    <template v-else>
    <h2>Kandidierende</h2>

      <p>Trage hier die Kandidierenden <b>in der vom Wahlausschuss ausgelosten zufälligen Reihenfolge</b> nacheinander
        ein.</p>

      <ol>
        <template v-for="(person, index) in electionProperties.candidates">
          <li>
            <input type="text" v-model="electionProperties.candidates[index]">
            <button class="btn btn-sm btn-close"
                    @click="()=>{electionProperties.candidates.splice(index, 1)}"></button>
          </li>
        </template>
      </ol>
      <button class="btn btn-outline-secondary btn-sm" @click="addCandidate">Hinzufügen</button>
    </template>

  </div>

  <div class="card">
    <div class="card-header">
      <h5 class="card-title">Fachschaft {{ electionProperties.fsName }}<br>
        Wahl {{ propDE.committeeDeterminerGenitive }} {{ propDE.committeeNameGenitive }}</h5>
      <h6 class="card-subtitle mb-2 text-body-secondary">
        Election of student representatives ({{ propEN.committeeName }})
      </h6>
      <p>
        Du hast <b>eine Stimme</b><br>
        You have <b>one vote</b>
      </p>
    </div>
    <ul class="list-group list-group-flush">
      <template v-if="!electionProperties.plenum" v-for="(person, index) in electionProperties.candidates">
        <li class="list-group-item">{{ person }}</li>
      </template>
      <li class="list-group-item" v-if="propDE.extraBallotLine"><span class="extra-ballot-line"></span></li>
      <li class="list-group-item" v-else><span class="extra-ballot-line"></span></li>
    </ul>
    <div class="card-footer" v-if="propDE.extraBallotLine || electionProperties.plenum">
      In das Freifeld darfst du eine Person aus dem Wählendenverzeichnis eintragen und
      anschließend deine Stimme für sie abgeben.<br>
      <span class="text-secondary">You may write any eligible person from the list of eligible voters into the free field
        and then vote for them.</span>
    </div>
  </div>

</template>

<style scoped>
h5, h6 {
  text-align: center;
}

.card-footer {
  font-size: 80%;
}

li.list-group-item:before {
  content: "○";
  font-size: 2rem;
  vertical-align: middle;
  line-height: .7rem;
  padding-right: .6rem;
}

li.list-group-item {
  font-size: 1rem;
}

.extra-ballot-line {
  display: inline-block;
  width: 80%;
  vertical-align: bottom;
  border-bottom: 2px solid black;
}
</style>
