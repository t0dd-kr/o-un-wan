<script setup lang="ts">
  const { showSortModal, sortBy, sortByLabel } = storeToRefs(usePost())
  const { showFilterModal, filterBy, filterByLabel } = storeToRefs(usePost())
  const route = useRoute()

  const images = ref([])

  for (let i = 0; i < 40; i++) {
    const number = Math.round(Math.random() * 1084)
    images.value.push(`https://picsum.photos/id/${number}/300/400`)
  }
</script>

<template>
  <div class="flex justify-center">
    <div
      class="relative flex h-full w-full max-w-[900px] flex-col items-center justify-center px-4 max-[420px]:w-full max-[420px]:min-w-0 max-[420px]:px-2"
    >
      <div class="h-full w-full py-1">
        <div class="mb-2 flex items-center justify-end gap-4 py-1">
          <button
            class="flex items-center gap-1 text-gray-500"
            :class="{
              'text-white': filterBy != 'ALL',
            }"
            @click="showFilterModal = true"
          >
            <icon name="heroicons:funnel-solid" class="aspect-square h-5 w-5" />
            {{ filterByLabel }}
          </button>

          <button
            class="flex items-center gap-1 text-gray-500"
            :class="{
              'text-white': sortBy != 'CREATED_AT__DESC',
            }"
            @click="showSortModal = true"
          >
            <icon
              name="heroicons:arrows-up-down"
              class="aspect-square h-5 w-5"
            />
            {{ sortByLabel }}
          </button>
        </div>

        <div class="grid w-full grid-cols-3 gap-2 pb-10 max-[420px]:gap-1">
          <div
            class="flex cursor-pointer items-center justify-center bg-white bg-opacity-0 hover:bg-opacity-5"
          >
            <icon name="heroicons:plus" class="h-12 w-12" />
          </div>
          <div
            v-for="(image, index) in images"
            :key="index"
            @click="$router.push(`/${index}`)"
            class="group relative cursor-pointer"
          >
            <div
              :style="`background-image: url(${image})`"
              class="aspect-square w-full bg-cover bg-center bg-no-repeat"
            />
            <div class="absolute left-0 top-0 h-full w-full p-2">
              <div class="flex items-center justify-end gap-1">
                <icon name="heroicons:square-2-stack-solid" class="h-6 w-6" />
              </div>
            </div>
            <div
              class="bg-base-100 absolute left-0 top-0 flex h-full w-full items-center justify-center bg-opacity-20 p-2 opacity-0 group-hover:opacity-100"
            >
              <div class="flex items-center gap-1">
                <icon
                  name="heroicons:chat-bubble-oval-left-solid"
                  class="h-6 w-6"
                />
                <span>5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <NuxtPage />
  </div>
</template>

<style scoped lang="scss">
  ::-webkit-scrollbar {
    // width: 0;
    // background: #e89a3e; /* 스크롤바 막대 색상 */
    // border: 2px solid #9b6a2f; /* 스크롤바 막대 테두리 설정  */
    // border-radius: 12px 12px 12px 12px;
  }
</style>
