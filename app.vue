<script setup lang="ts">
import {useElectionProperties} from "~/composables/states";
import {downloadText, importData} from "~/utils/file";

const electionProperties = useElectionProperties();
const loadCallback = (text: string) => {
  try {
    electionProperties.value = JSON.parse(text);
  } catch (e: any) {
    alert('Fehler: Daten konnten nicht geladen werden:\n' + e.toString());
  }
}
const load = () => {
  importData(loadCallback);
};
const save = () => {
  const value = JSON.stringify(electionProperties.value, null, 2);
  let fsName = electionProperties.value.fsName.replaceAll(' ', '-') || 'fachschaft';
  downloadText(fsName, value);
};
</script>
<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <NuxtLink to="/" class="navbar-brand">fswahl</NuxtLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <NuxtLink to="/" class="nav-link" v-bind:class="{ 'active': $route.path == '/' }">
              Konfiguration
            </NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink to="/fristen" class="nav-link" v-bind:class="{ 'active': $route.path == '/fristen' }">
              Wahlfristen
            </NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink to="/wahlbekanntmachung" class="nav-link"
                      v-bind:class="{ 'active': $route.path == '/wahlbekanntmachung' }">
              Wahlbekanntmachung
            </NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink to="/stimmzettel" class="nav-link" v-bind:class="{ 'active': $route.path == '/stimmzettel' }">
              Stimmzettel
            </NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink to="/ergebnis" class="nav-link" v-bind:class="{ 'active': $route.path == '/ergebnis' }">
              Ergebnis
            </NuxtLink>
          </li>
        </ul>
        <div class="btn-group me-3" role="group" aria-label="Laden/Speichern">
          <button type="button" class="btn btn-outline-primary" @click="load">Laden</button>
          <button type="button" class="btn btn-outline-primary" @click="save">Speichern</button>
        </div>
        <div class="d-flex me-1">
          <a href="https://github.com/FK-Bonn/fswahl" title="Open Project on GitHub">
            <img style="height: 2em;" src="/github-mark.svg" alt="GitHub logo"/>
          </a>
        </div>
      </div>
    </div>
  </nav>
  <div class="container pt-3">
    <NuxtPage/>
  </div>
</template>
