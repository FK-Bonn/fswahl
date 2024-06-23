<script setup lang="ts">
import ResultMissingValuesWarning from "~/components/alerts/ResultMissingValuesWarning.vue";

const electionProperties = useElectionProperties();
const propDE = computed(() => new PropertyCalculator(electionProperties.value))
const propEN = computed(() => new PropertyCalculatorEN(electionProperties.value))
const hasNonElected = computed(()=>electionProperties.value.votes.length > (propDE.value.seats || 0)
    || electionProperties.value.votes.some(vote => vote.votes < 1))

const addIndividualVote = () => {
  electionProperties.value.votes.push({
    name: '',
    votes: 0,
  })
}
</script>

<template>

  <PrintButton/>

  <ResultMissingValuesWarning/>

  <div class="d-print-none">
    <h1>Ergebnis</h1>

    <p>Trage hier die Namen der Personen mit ihrer Stimmzahl in der vom Wahlausschuss ermittelten Reihenfolge
      nacheinander ein.</p>
    <p>Positon 1 hat die meisten Stimmen, die letzte Position ({{ electionProperties.votes.length }}) die wenigsten
      Stimmen.</p>

    <table id="results_table" class="table table-striped table-hover">
      <tbody>
      <tr>
        <th>Position</th>
        <th>Name</th>
        <th>Stimmen</th>
        <th></th>
      </tr>
      <template v-for="(person, index) in electionProperties.votes">
        <EditableIndividualResultRow :index="index+1" :item="person"
                                     :remove="()=>{electionProperties.votes.splice(index, 1)}"/>
      </template>
      </tbody>
      <tfoot>
      <tr>
        <td colspan="5">
          <button class="btn btn-outline-secondary btn-sm" @click="addIndividualVote">Hinzufügen</button>
        </td>
      </tr>
      </tfoot>
    </table>

    <div class="row mb-3">
      <label for="invalid-votes" class="col-lg-3 col-form-label">Anzahl der ungültigen Stimmen</label>
      <div class="col-lg-2">
        <input type="number" class="form-control" id="invalid-votes" v-model="electionProperties.invalidVotes">
      </div>
    </div>

    <div class="row mb-3">
      <label for="invalid-votes" class="col-lg-3 col-form-label">Anzahl der Enthaltungen</label>
      <div class="col-lg-2">
        <input type="number" class="form-control" id="invalid-votes" v-model="electionProperties.abstentions">
      </div>
    </div>

    <div class="row mb-3">
      <label for="result-location" class="col-lg-3 col-form-label">Ort der Veröffentlichung des Wahlergebnisses</label>
      <div class="col-lg-2">
        <input type="text" class="form-control" id="result-location" v-model="electionProperties.resultLocation">
      </div>
    </div>

    <div class="row mb-3">
      <label for="result-date" class="col-lg-3 col-form-label">Datum der Veröffentlichung des Wahlergebnisses</label>
      <div class="col-lg-2">
        <input type="date" class="form-control" id="result-date" v-model="electionProperties.resultDate">
      </div>
    </div>
  <hr>
  </div>


  <div id="wahlergebnis">
    <h2> Wahl <span class="derdesfsvfsr">{{ propDE.committeeDeterminerGenitive }}
    </span> <span class="fsvfsr">{{ propDE.committeeName }}</span> der Fachschaft <span
        class="fachschaft">{{ electionProperties.fsName }}</span> der
      Rheinischen Friedrich-Wilhelms-Universität Bonn </h2>
    <h3>Election of the student representatives for Fachschaft <span
        class="fachschaft">{{ electionProperties.fsName }}</span> at
      the University of Bonn </h3>
    <h1> - Wahlergebnis - </h1>
    <h2> - Election result - </h2>
    <h4><span class="ort_wahlergebnis">{{ electionProperties.resultLocation }}</span>, <span
        class="datum_wahlergebnis">{{ propDE.resultDate }}</span>
    </h4>
    <br>
    <div class="row" v-if="electionProperties.plenum">
      <div class="col-sm-6">
        <p>Das Ergebnis der Wahl <span class="derdesfsvfsr">{{ propDE.committeeDeterminerGenitive }}</span> <span
            class="fsvfsr">{{ propDE.committeeName }}</span>
          der Fachschaft <span class="fachschaft">{{ electionProperties.fsName }}</span> <span
              class="wahlzeitraum">am {{ propDE.firstElectionDay }}</span> lautet wie folgt.</p>
      </div>
      <div class="col-sm-6">
        <p>The election result for the election of the student representatives (<span
            class="fsvfsr">{{ propEN.committeeName }}</span>)
          for Fachschaft <span class="fachschaft">{{ electionProperties.fsName }}</span> <span
              class="wahlzeitraum_engl">on {{ propEN.firstElectionDay }}</span> is listed below.</p>
      </div>
    </div>
    <div class="row" v-else>
      <div class="col-sm-6">
        <p>Das Ergebnis der Wahl <span class="derdesfsvfsr">{{ propDE.committeeDeterminerGenitive }}</span> <span
            class="fsvfsr">{{ propDE.committeeName }}</span>
          der Fachschaft <span class="fachschaft">{{ electionProperties.fsName }}</span> <span
              class="wahlzeitraum">vom {{ propDE.firstElectionDay }} bis zum {{ propDE.lastElectionDay }}</span>
          lautet wie folgt.</p>
      </div>
      <div class="col-sm-6">
        <p>The election result for the election of the student representatives (<span
            class="fsvfsr">{{ propEN.committeeName }}</span>)
          for Fachschaft <span class="fachschaft">{{ electionProperties.fsName }}</span> <span
              class="wahlzeitraum_engl">from {{ propEN.firstElectionDay }} until {{ propEN.lastElectionDay }}</span>
          is listed below.</p>
      </div>
    </div>
    <div class="row">
      <table class="table">
        <tbody>
        <tr>
          <th>Wahlberechtigte</th>
          <td><span class="anzwahlberechtigte">{{ electionProperties.eligibleVoters }}</span></td>
          <th>Eligible voters</th>
        </tr>
        <tr>
          <th>Abgegebene Stimmen</th>
          <td><span class="abgegebene_stimmen">{{ propDE.totalVotes }}</span></td>
          <th>Cast votes</th>
        </tr>
        <tr>
          <th>Wahlbeteiligung</th>
          <td><span class="wahlbeteiligung">{{ propDE.turnout }}</span></td>
          <th>Voter turnout</th>
        </tr>
        <tr>
          <th>Abgegebene ungültige Stimmen</th>
          <td><span class="ungueltige_stimmen">{{ electionProperties.invalidVotes }}</span></td>
          <th>Invalid votes</th>
        </tr>
        <tr>
          <th>Enthaltungen</th>
          <td><span class="enthaltungen">{{ electionProperties.abstentions }}</span></td>
          <th>Abstentions</th>
        </tr>
        <tr>
          <th>Abgegebene gültige Stimmen</th>
          <td><span class="gueltige_stimmen">{{ propDE.validVotes }}</span></td>
          <th>Valid votes</th>
        </tr>
        </tbody>
      </table>
    </div>
    <h5>Gewählt / Elected</h5>
    <div class="row">
      <table class="table">
        <thead>
        <tr>
          <th scope="col">Postition/Rank</th>
          <th scope="col">Name/Name</th>
          <th scope="col">Stimmen/Votes</th>
        </tr>
        </thead>
        <tbody id="teilergebnisse_table">
        <template v-for="(person, index) in electionProperties.votes">
          <tr v-if="(index < (propDE.seats || 0)) && person.votes > 0">
            <td>{{ index + 1 }}</td>
            <td>{{ person.name }}</td>
            <td>{{ person.votes }}</td>
          </tr>
        </template>
        </tbody>
      </table>
    </div>
    <template v-if="hasNonElected">
      <h5>Nicht gewählt / Not elected</h5>
      <div class="row">
        <table class="table">
          <thead>
          <tr>
            <th scope="col">Postition/Rank</th>
            <th scope="col">Name/Name</th>
            <th scope="col">Stimmen/Votes</th>
          </tr>
          </thead>
          <tbody id="teilergebnisse_table">
          <template v-for="(person, index) in electionProperties.votes">
            <tr v-if="index >= (propDE.seats || 0) || person.votes < 1">
              <td>{{ index + 1 }}</td>
              <td>{{ person.name }}</td>
              <td>{{ person.votes }}</td>
            </tr>
          </template>
          </tbody>
        </table>
      </div>
    </template>
    <div class="row">
      <div class="col-sm-6">
        <p> Die ersten <span class="zahl_sitze">{{ propDE.seats }}</span> Personen mit den meisten Stimmen, die
          mindestens 1 Stimme
          erhalten haben, sind gewählt.</p>
        <p> Bei Stimmengleichheit wurde die Reihenfolge gelost.</p>
      </div>
      <div class="col-sm-6">
        <p> The <span class="zahl_sitze">{{ propEN.seats }}</span> persons with most votes are elected, if they got at
          least 1 vote.
        </p>
        <p> If there is an equality of votes the rank was determined by random process.</p>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-6">
        <h3>Einspruch gegen das Wahlergebnis</h3>
        <p>Gegen dieses Wahlergebnis kann innerhalb von 14 Tagen nach seiner Veröffentlichung auf der 
          Bekanntmachungsplattform der Studierendenschaft beim Wahlprüfungsausschuss der Fachschaftenkonferenz
          schriftlich oder per E-Mail an fsen@asta.uni-bonn.de (c/o Fachschaftenreferat) Einspruch erhoben werden.</p>
      </div>
      <div class="col-sm-6">
        <h3>Objection against the election result</h3>
        <p> An objection against the election result can be raised until 14 days after its publication in the student body's
          public notices. Objections must be submitted to the Wahlprüfungsausschuss of
          the Fachschaftenkonferenz in writing or by email to fsen@asta.uni-bonn.de (c/o Fachschaftenreferat). </p>
      </div>
    </div>
    <div class="row" v-if="electionProperties.plenum">
      <div class="col-sm-6">

        <h3>Konstituierende Sitzung</h3>

        <p>Die konstituierende Sitzung fand im Anschluss an die Bekanntgabe des Wahlergebnisses
          auf der Wahlvollversammlung statt.</p>
      </div>
      <div class="col-sm-6">

        <h3>Constituent assembly</h3>

        <p>The constituent assembly took place following the announcement of the election result
          during the election plenum.</p>
      </div>
    </div>
    <div class="row" v-else>
      <div class="col-sm-6">

        <h3>Konstituierende Sitzung</h3>

        <p>Die konstituierende Sitzung <span class="derdesfsvfsr">{{ propDE.committeeDeterminerGenitive }}</span> neu
          gewählten <span class="fsvfsr">{{ propDE.committeeName }}</span>
          findet am <span class="datum_konstituierende_sitzung">{{ propDE.constituentAssemblyDate }}</span> um <span
              class="uhrzeit_konstituierende_sitzung">{{ propDE.constituentAssemblyTime }}</span> Uhr <span
              class="ort_konstituierende_sitzung">{{ electionProperties.constituentAssemblyLocationDE }}</span>
          statt.</p>
      </div>
      <div class="col-sm-6">

        <h3>Constituent assembly</h3>

        <p>The constituent assembly will take place on <span
            class="datum_konstituierende_sitzung">{{ propEN.constituentAssemblyDate }}</span> at <span
            class="uhrzeit_konstituierende_sitzung">{{ propEN.constituentAssemblyTime }}</span> <span
            class="ort_konstituierende_sitzung_engl">{{ electionProperties.constituentAssemblyLocationEN }}</span>
          .</p>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-4">
        <br>
        <br>
        <br>
        <p>{{ electionProperties.resultLocation }} <span class="datum_wahlergebnis">{{ propDE.resultDate }}</span>,
          ________________________________</p>
        <p>Datum, Unterschrift <b><span class="wahlleitung">{{ electionProperties.supervisorName }}</span></b>
          (Wahlleitung)<br>
          Date, Signature <b><span class="wahlleitung">{{ electionProperties.supervisorName }}</span></b> (Election
          supervisor)</p>
      </div>
      <div class="col-sm-8">
        <br>
        <br>
        <br>
        <p>_____________________________________________________________________________________________</p>
        <p>Unterschriften weiterer Wahlausschusmitglieder<br>
          Signatures other members of election committee</p>
      </div>
    </div>

  </div>

</template>

<style scoped>
h1, h2, h3, h4, h5 {
  text-align: center;
}
@media print {

  .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12 {
    float: left;
  }

  .col-sm-12 {
    width: 100%;
  }

  .col-sm-11 {
    width: 91.66666666666666%;
  }

  .col-sm-10 {
    width: 83.33333333333334%;
  }

  .col-sm-9 {
    width: 75%;
  }

  .col-sm-8 {
    width: 66.66666666666666%;
  }

  .col-sm-7 {
    width: 58.333333333333336%;
  }

  .col-sm-6 {
    width: 50%;
  }

  .col-sm-5 {
    width: 41.66666666666667%;
  }

  .col-sm-4 {
    width: 33.33333333333333%;
  }

  .col-sm-3 {
    width: 25%;
  }

  .col-sm-2 {
    width: 16.666666666666664%;
  }

  .col-sm-1 {
    width: 8.333333333333332%;
  }
}
</style>
