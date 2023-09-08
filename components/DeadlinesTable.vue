<script setup lang="ts">

import {useElectionProperties} from "~/composables/states";

const electionProperties = useElectionProperties();
const calculatedElectionProperties = computed(() => new PropertyCalculator(electionProperties.value))
</script>

<template>

  <table class="table table-striped table-hover">
    <tbody>
    <tr>
      <th>Aktion</th>
      <th>Frist</th>
      <th>Absatz in FSWO</th>
    </tr>
    <tr>
      <td>Festlegung des Wahltermins</td>
      <td>bis <span id="flwahltermin">{{ calculatedElectionProperties.setElectionDate }}</span></td>
      <td><a href="https://sp.uni-bonn.de/dokumente/idx/Ordnungen/FSWO.html#%C2%A710">§ 10 Abs. 2</a></td>
    </tr>
    <tr>
      <td>Wahl des Wahlleiters und des Wahlausschusses</td>
      <td>bis <span id="wlundwa">{{ calculatedElectionProperties.electSupervisorAndCommittee }}</span></td>
      <td><a href="https://sp.uni-bonn.de/dokumente/idx/Ordnungen/FSWO.html#%C2%A711">§ 11 Abs. 2</a></td>
    </tr>
    <tr>
      <td>Stichtag Wahlberechtigung</td>
      <td id="stwber">{{ calculatedElectionProperties.eligibilityDeadline }}</td>
      <td><a href="https://sp.uni-bonn.de/dokumente/idx/Ordnungen/FSWO.html#%C2%A79">§ 9 Abs. 1</a></td>
    </tr>
    <tr>
      <td>Konstituierende Sitzung des Wahlausschusses</td>
      <td>bis <span id="konstwa">{{ calculatedElectionProperties.firstCommitteeMeeting }}</span></td>
      <td><a href="https://sp.uni-bonn.de/dokumente/idx/Ordnungen/FSWO.html#%C2%A713">§ 13 Abs. 4</a></td>
    </tr>
    <tr>
      <td>
        <ul class="list-unstyled">
          <li>Festlegung der Urnenstandorte und -öffnungszeiten</li>
          <li>Festlegung der Auslageorte für das Wählendenverzeichnis und des Zeitraums der Auslage</li>
          <li>Festlegung der gemeinsamen Frist für die Einreichung von Kandidaturen,<br> Briefwahlanträgen und
            Einsprüchen gegen das Wählendenverzeichnis
          </li>
          <li>Festlegung des Zeitpunkts des Endes der Wahl und des Ortes für die Auszählung der Wahl</li>
          <li>Festlegung des Ortes und Termins für die konstituierende Sitzung des gewählten Organs</li>
        </ul>
      </td>
      <td>bis <span id="flaowvz">{{ calculatedElectionProperties.committeeDecisions }}</span></td>
      <td><a href="https://sp.uni-bonn.de/dokumente/idx/Ordnungen/FSWO.html#%C2%A713">§ 13 Abs. 5</a></td>
    </tr>
    <tr>
      <td>Übernahme des Wählendenverzeichnisses</td>
      <td>bis <span id="uebernahmewvz">{{ calculatedElectionProperties.takeOverListOfEligibleVoters }}</span></td>
      <td><a href="https://sp.uni-bonn.de/dokumente/idx/Ordnungen/FSWO.html#%C2%A714">§ 14 Abs. 1</a></td>
    </tr>
    <tr>
      <td>Wahlbekanntmachung</td>
      <td>bis <span id="wbk">{{ calculatedElectionProperties.publishAnnouncement }}</span></td>
      <td><a href="https://sp.uni-bonn.de/dokumente/idx/Ordnungen/FSWO.html#%C2%A715">§ 15 Abs. 1</a></td>
    </tr>
    <tr>
      <td class="wb">Auslage des Wählendenverzeichnisses (mindestens 3 Tage)</td>
      <td><i>↓ vor dieser Frist</i></td>
      <td><a href="https://sp.uni-bonn.de/dokumente/idx/Ordnungen/FSWO.html#%C2%A714">§ 14 Abs. 3</a></td>
    </tr>
    <tr>
      <td class="wb">
        <ul class="list-unstyled">
          <li>Gemeinsame Frist zur Einreichung von Kandidaturen,</li>
          <li>zur Einreichung von Briefwahlanträgen, und</li>
          <li>zur Einreichung von Einsprüchen gegen das Wählendenverzeichnis</li>
        </ul>
      </td>
      <td>Zwischen
        <span id="wvs">{{ calculatedElectionProperties.mainDeadlineEarliest }}</span><br>
        und
        <span id="wve">{{ calculatedElectionProperties.mainDeadlineLatest }}</span>
      </td>
      <td><a href="https://sp.uni-bonn.de/dokumente/idx/Ordnungen/FSWO.html#%C2%A713">§ 13 Abs. 5</a></td>
    </tr>
    <tr>
      <td class="wb">Wahlauschusssitzung zur
        <ul class="list-unstyled">
          <li>Zulassung der mängelfreien Kandidaturen zur Wahl,</li>
          <li>ggf. Feststellung von Mängeln in eingereichten Kandidaturen und Setzen einer angemessenen Nachfrist,</li>
          <li>ggf. Entscheidung über Anträge auf Briefwahl,</li>
          <li>ggf. Entscheidung über Einsprüche gegen das Wählendenverzeichnis.</li>
        </ul>
      </td>
      <td><i>↑ unmittelbar nach Ablauf dieser Frist</i></td>
      <td><a href="https://sp.uni-bonn.de/dokumente/idx/Ordnungen/FSWO.html#%C2%A713">§ 13 Abs. 7</a></td>
    </tr>

    <tr>
      <td>Bekanntmachung der Wahlvorschläge</td>
      <td>ca. <span id="bkwv">{{ calculatedElectionProperties.publicationOfCandidates }}</span></td>
      <td><a href="https://sp.uni-bonn.de/dokumente/idx/Ordnungen/FSWO.html#%C2%A713">§ 13 Abs. 7</a><br><a
          href="https://sp.uni-bonn.de/dokumente/idx/Ordnungen/FSWO.html#%C2%A716">§ 16 Abs. 4</a></td>
    </tr>
    <tr>
      <td class="wb"><i>Erster Wahltag</i></td>
      <td id="ewt"><i>{{ calculatedElectionProperties.firstElectionDay }}</i></td>
      <td><a href="https://sp.uni-bonn.de/dokumente/idx/Ordnungen/FSWO.html#%C2%A710">§ 10 Abs. 1</a></td>
    </tr>
    <tr>
      <td class="wb"><i>Letzter Wahltag</i></td>
      <td id="lwt"><i>{{ calculatedElectionProperties.lastElectionDay }}</i></td>
      <td><a href="https://sp.uni-bonn.de/dokumente/idx/Ordnungen/FSWO.html#%C2%A710">§ 10 Abs. 1</a></td>
    </tr>
    <tr>
      <td>Konstituierende Sitzung der FSV</td>
      <td>Zwischen
        <span id="konstfsvs">{{ calculatedElectionProperties.initialMeetingEarliest }}</span><br>
        und
        <span id="konstfsve">{{ calculatedElectionProperties.initialMeetingLatest }}</span>
      </td>
      <td><a href="https://sp.uni-bonn.de/dokumente/idx/Ordnungen/FSWO.html#%C2%A722">§ 22</a></td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>

</style>