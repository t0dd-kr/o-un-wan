<script setup lang="ts">
  const { showFilterModal, filterBy, filterByOptions } = storeToRefs(usePost())
  const { setFilterBy } = usePost()
</script>

<template>
  <div
    v-if="showFilterModal"
    @click.self="showFilterModal = false"
    class="bg-base-100 fixed left-0 top-0 z-20 flex h-screen w-screen items-center justify-center bg-opacity-80"
  >
    <ul
      tabindex="0"
      class="menu bg-base-200 rounded-box w-52 p-2 text-center shadow"
    >
      <li v-for="option in filterByOptions" :key="option.value">
        <a class="block w-full text-center" @click="setFilterBy(option.value)">
          {{ option.label }}
          <div
            v-if="filterBy == option.value"
            class="absolute right-0 top-0 flex h-full w-full items-center justify-end px-2"
          >
            <icon name="heroicons:check-circle-20-solid" class="h-5 w-5" />
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss"></style>
