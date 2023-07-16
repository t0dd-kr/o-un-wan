<script setup lang="ts">
  const {
    showFilterModal,
    filterBy,
    filterByLabel,
    showSortModal,
    sortBy,
    sortByLabel,
    posts,
  } = storeToRefs(usePost())

  const { getPosts } = usePost()

  const route = useRoute()

  useAsyncData(async () => {
    await getPosts(true)
  })

  watch(sortBy, () => {
    getPosts(true)
  })

  watch(filterBy, () => {
    getPosts(true)
  })

  onMounted(() => {
    const body = ref(document)

    const { arrivedState, isScrolling } = useScroll(body, {
      behavior: 'smooth',
    })

    const { bottom } = toRefs(arrivedState)

    function onScroll() {
      if (isScrolling.value && bottom.value) {
        getPosts()
      }
    }

    window.addEventListener('scroll', onScroll)

    onUnmounted(() => {
      window.removeEventListener('scroll', onScroll)
    })
  })
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
            <Icon name="heroicons:funnel-solid" class="aspect-square h-5 w-5" />
            {{ filterByLabel }}
          </button>

          <button
            class="flex items-center gap-1 text-gray-500"
            :class="{
              'text-white': sortBy != 'CREATED_AT__DESC',
            }"
            @click="showSortModal = true"
          >
            <Icon
              name="heroicons:arrows-up-down"
              class="aspect-square h-5 w-5"
            />
            {{ sortByLabel }}
          </button>
        </div>

        <div class="grid w-full grid-cols-3 gap-2 pb-10 max-[420px]:gap-1">
          <div
            class="flex aspect-square cursor-pointer items-center justify-center bg-white bg-opacity-0 hover:bg-opacity-5"
            @click="$router.push('/new')"
          >
            <Icon
              name="heroicons:plus"
              class="h-12 w-12 max-[420px]:h-6 max-[420px]:w-6"
            />
          </div>
          <div
            v-for="(post, index) in posts"
            :key="post.uid"
            @click="$router.push(`/${post.uid}`)"
            class="group relative cursor-pointer"
          >
            <div
              :style="`background-image: url(${post.images[0]})`"
              class="aspect-square w-full bg-cover bg-center bg-no-repeat"
            />
            <div class="absolute left-0 top-0 h-full w-full p-2">
              <div
                class="flex items-center justify-end gap-1"
                v-if="post.images.length > 1"
              >
                <Icon name="heroicons:square-2-stack-solid" class="h-6 w-6" />
              </div>
            </div>
            <div
              class="bg-base-100 absolute left-0 top-0 flex h-full w-full items-center justify-center bg-opacity-20 p-2 opacity-0 group-hover:opacity-100"
            >
              <div class="flex items-center gap-1">
                <Icon
                  name="heroicons:chat-bubble-oval-left-solid"
                  class="h-6 w-6"
                />
                <span>{{ post.commentCount }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <NuxtPage />
  </div>
</template>

<style scoped lang="scss"></style>
