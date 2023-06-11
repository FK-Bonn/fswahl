<script setup lang="ts">
import PrintButton from "~/components/PrintButton.vue";

</script>

<template>

  <PrintButton/>

  <div id="announcement-de">
    <AnnouncementOfElectionDE/>
  </div>

  <hr>
  <div id="announcement-en">
    <AnnouncementOfElectionEN/>
  </div>

</template>

<style scoped>
@media print {
  #announcement-de {
    page-break-after: always;
  }

  hr {
    display: none;
  }
}
</style>
