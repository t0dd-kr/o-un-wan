<script setup lang="ts">
  const { showSortModal, sortBy, sortByLabel } = storeToRefs(usePost())
</script>

<template>
  <ModalPost />
</template>

<style scoped lang="scss"></style>
