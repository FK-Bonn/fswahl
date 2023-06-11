<script setup lang="ts">
const electionProperties = useElectionProperties();
const prop = computed(() => new PropertyCalculator(electionProperties.value))
</script>

<template>

  <h1>Wahlbekanntmachung</h1>

  <h2>Wahl <span class="derdesfsvfsr">{{ prop.committeeDeterminerGenitive }}</span> <span
      class="fsvfsr">{{ prop.committeeNameGenitive }}</span> der Fachschaft
    <span class="fachschaft">{{ electionProperties.fsName }}</span></h2>

  <p>Gewählt wird <span class="diederfsvfsr">{{ prop.committeeDeterminer }}
        </span> <b><span class="fsvfsr">{{ prop.committeeName }}</span> der
    Fachschaft <span class="fachschaft">{{ electionProperties.fsName }}</span></b>
    der Rheinischen Friedrich-Wilhelms-Universität Bonn.</p>

  <p>Es sind <b><span class="zahl_sitze">{{ prop.seats }}</span> Mitglieder</b> in
    <span class="diedenfsvfsr">{{ prop.committeeDeterminerAccusative }}</span> <span
        class="fsvfsr">{{ prop.committeeName }}</span> zu wählen.</p>

  <p v-if="electionProperties.plenum">Die Wahl findet am <span class="wahlzeitraum">{{ prop.firstElectionDay }}</span>
    als Wahlvollversammlung statt.</p>
  <p v-else>Die Wahl findet im Zeitraum <span class="wahlzeitraum">vom
          {{ prop.firstElectionDay }} bis zum
          {{ prop.lastElectionDay }}</span> statt.</p>

  <h3>Ort und Zeit der Stimmabgabe</h3>

  <p>Das Wahllokal ist zu folgenden Zeiten an folgenden Orten geöffnet:</p>

  <table id="urnenstandorte_table" class="table table-striped table-hover">
    <thead>
    <tr>
      <th>Datum</th>
      <th colspan="2">Uhrzeit</th>
      <th>Ort</th>
    </tr>
    </thead>
    <tbody>
    <template v-for="place in electionProperties.pollingPlaces">
      <EventPlaceRowDE :event-place="place"/>
    </template>
    </tbody>
  </table>

  <h3>Kandiaturen</h3>

  <p><b>Musterformulare für Kandiaturen sind bei der Wahlleitung erhältlich.<br>
    Ihre Verwendung wird empfohlen.</b></p>

  <p>Kandiaturen sind bis zum
    <b><span class="frist_einreichung_wahlvorschlaege">{{ prop.mainDeadlineDate }}</span>
    </b> um <b><span class="frist_einreichung_wahlvorschlaege_uhrzeit"
    >{{ prop.mainDeadlineTime }}</span> Uhr</b> bei der <b>Wahlleitung</b> einzureichen.
  </p>

  <p>Eine Kandidatur muss mindestens enthalten: Familienname(n), Vorname(n), der Name, wie er auf dem Stimmzettel
    stehen soll, ladungsfähige Anschrift, E-Mail-Adresse, Matrikelnummer und Unterschrift der kandidierenden
    Person, sowie Bezeichnung der Wahl, für die die Kandidatur gelten soll</p>

  <p>(Die Anforderungen an einen Wahlvorschlag ergeben sich aus § 14 FSWO (Siehe
    http://sp.uni-bonn.de/dokumente/idx/Ordnungen/FSWO.html#§14)</p>

  <p v-if="electionProperties.plenum">Ebenso ist es möglich, auf der Wahlvollversammlung die Kandidatur zu erklären.</p>

  <template v-if="electionProperties.plenum">
    <h3>Tagesordnung der Wahlvollversammlung</h3>

    <ol>
      <li>Eröffnung</li>
      <li>Aufnahme weiterer Kandidaturen</li>
      <li>Vorstellung der Kandidaturen</li>
      <li>Wahl</li>
      <li>Auszählung und Verlesung des Wahlergebnisses</li>
      <li>Konstituierung des FSR / der FSV</li>
    </ol>
  </template>

  <h3>Wahlsystem</h3>

  <p> Eine Fachschaft bildet einen Wahlkreis. Jede wahlberechtigte Person hat eine Stimme, die sie für eine
    kandidierende Person abgibt.</p>

  <p> Gewählt sind die Personen mit den meisten Stimmen, die mindestens 1 Stimme erhalten haben.</p>

  <p> Bei Stimmgleichheit entscheidet die Wahlleitung durch Los über die Reihenfolge.</p>

  <p> Scheidet ein gewähltes Mitglied aus, so wird der Sitz derjenigen kandidierenden Person zugeteilt, die nach
    dem Wahlergebnis unter den bisher nicht berücksichtigten Personen die meisten Stimmen, jedoch mindestens eine
    Stimme, hat. Ist die Liste dieser Personen erschöpft, so bleibt der Sitz unbesetzt.</p>

  <p> Ist zu einem Zeitpunkt mindestens die Hälfte der Sitze des Organs unbesetzt, finden innerhalb der nach
    dieser Wahlordnung kürzestmöglichen Zeit Neuwahlen statt. Der oder die FSR-Vorsitzende beruft dann
    unverzüglich eine FSVV ein, auf der der Wahltermin festgelegt und ein Wahlausschuss gewählt wird.
  </p>

  <h3>Wählendenverzeichnis</h3>

  <p>Wahlberechtigt und wählbar sind die Mitglieder der Fachschaft <span
      class="fachschaft">{{ electionProperties.fsName }}</span>, die am
    <b><span class="frist_wahlberechtigung">{{ prop.eligibilityDeadline }}</span></b> an
    der Rheinischen Friedrich-Wilhelms-Universität Bonn
    eingeschrieben sind. Maßgeblich für die Wahlberechtigung ist darüber hinaus das bei der Immatrikulation oder
    der Rückmeldung für die Wahlberechtigung angegebene Fach. Zweithörer und Gasthörer sind nicht wahlberechtigt.
  </p>

  <p>Wählen kann nur, wer im Wählendenverzeichnis eingetragen ist.</p>

  <p>Das Wählendenverzeichnis liegt wie folgt aus:</p>

  <table id="wvz_table" class="table table-striped table-hover">
    <thead>
    <tr>
      <th>Datum</th>
      <th colspan="2">Uhrzeit</th>
      <th>Ort</th>
    </tr>
    </thead>
    <tbody>
    <template v-for="place in electionProperties.electoralRegisterPlaces">
      <EventPlaceRowDE :event-place="place"/>
    </template>
    </tbody>
  </table>

  <p>Einsprüche gegen die Richtigkeit des Wählendenverzeichnisses können bei der Wahlleitung innerhalb der
    Auslegungsfrist, jedoch spätestens bis <b><span
        class="frist_einreichung_wahlvorschlaege">{{ prop.mainDeadlineDate }}</span></b>
    um <b><span
        class="frist_einreichung_wahlvorschlaege_uhrzeit">{{
        prop.mainDeadlineTime
      }}</span> Uhr</b>
    eingelegt werden. </p>

  <h3>Briefwahl</h3>

  <p>Es ist in begründeten Ausnahmefällen möglich, Briefwahl zu beantragen. Der Briefwahlantrag ist schriftlich
    einzureichen und zu begründen. Er muss Name, Anschrift und Matrikelnummer des Antragsstellers enthalten.</p>

  <p>Anträge auf Briefwahl müssen bis spätestens <b><span
      class="frist_einreichung_wahlvorschlaege">{{ prop.mainDeadlineDate }}</span></b> um
    <b><span
        class="frist_einreichung_wahlvorschlaege_uhrzeit">{{
        prop.mainDeadlineTime
      }}</span></b> Uhr bei der Wahlleitung eingegangen sein.
    Briefwähler*innen müssen ihre Briefwahlunterlagen bis spätestens 24 Stunden vor der Wahl bei der Wahlleitung
    abholen. Briefwähler*innen, die außerdem nicht in der Lage sind, ihre Briefwahlunterlagen persönlich bei der
    Wahlleitung abzuholen, können die Briefwahlunterlagen zusammen mit dem Antrag auf Briefwahl schriftlich
    anfordern.</p>

  <h3>Auszählung</h3>

  <p v-if="electionProperties.plenum">
    Die öffentliche Auszählung findet während der Wahlvollversammlung in Anschluss an den Wahlvorgang statt.
  </p>

  <p v-else>Die öffentliche Auszählung der Wahl findet am <span
      class="datum_auszaehlung">{{ prop.countingDate }}</span> um <span
      class="uhrzeit_auszaehlung">{{ prop.countingTime }}</span> Uhr <span
      class="ort_auszaehlung">{{ electionProperties.countingLocationDE }}</span> statt.</p>


  <h3>Konstituierende Sitzung</h3>

  <p v-if="electionProperties.plenum">
    Die konstituierende Sitzung <span class="derdesfsvfsr">{{prop.committeeDeterminerGenitive}}</span> neu
    gewählten <span class="fsvfsr">{{prop.committeeNameGenitive}}</span>
    findet während der Wahlvollversammlung direkt nach Bekanntgabe des Wahlergebnisses statt.
  </p>

  <p v-else>Die konstituierende Sitzung <span class="derdesfsvfsr">{{prop.committeeDeterminerGenitive}}</span> neu
    gewählten <span class="fsvfsr">{{prop.committeeNameGenitive}}</span>
    findet am <span class="datum_konstituierende_sitzung">{{ prop.constituentAssemblyDate }}</span> <span
        class="uhrzeit_konstituierende_sitzung">{{ prop.constituentAssemblyTime }}</span> Uhr <span
        class="ort_konstituierende_sitzung">{{ electionProperties.constituentAssemblyLocationDE }}</span>
    statt.</p>

  <h3> Wahlleitung </h3>
  <p>Die Wahl wird geleitet von <b><span class="wahlleitung">{{ electionProperties.supervisorName }}</span></b>.</p>
  <p>Kontakt: <span class="wahlleitungkontakt">{{ electionProperties.supervisorEmail }}</span></p>
  <br>
  <br>
  <br>
  <p>__________________________________________</p>
  <p>Unterschrift <b><span class="wahlleitung">{{ electionProperties.supervisorName }}</span></b> (Wahlleitung)</p>
</template>

<style scoped>
h1, h2 {
  text-align: center;
}
</style>
