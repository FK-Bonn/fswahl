<script setup lang="ts">
const printPage = () => {
  window.print();
}
</script>

<template>
  <div class="d-print-none">
    <button class="btn btn-primary" @click="printPage">Drucken</button>
  </div>
</template>

<style scoped>

</style>
