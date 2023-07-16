<script setup lang="ts">
  const { showSortModal, sortBy, sortByOptions, filterByOptions } = storeToRefs(
    usePost(),
  )
  const { setSortBy } = usePost()

  const content = ref('')

  const post = ref({
    createdAt: '2021-10-01T00:00:00.000Z',
    nickname: 't0dd',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
    images: [
      `https://picsum.photos/id/100/800/800`,
      `https://picsum.photos/id/110/800/1000`,
      `https://picsum.photos/id/102/800/800`,
      `https://picsum.photos/id/103/600/700`,
      `https://picsum.photos/id/140/1000/800`,
    ],
    exerciseType: 'RUNNING',
  })

  const comments = ref([
    {
      nickname: 't0dd',
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
      createdAt: '2021-10-01T00:00:00.000Z',
    },
    {
      nickname: 't0dd',
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
      createdAt: '2021-10-01T00:00:00.000Z',
    },
    {
      nickname: 't0dd',
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
      createdAt: '2021-10-01T00:00:00.000Z',
    },
    {
      nickname: 't0dd',
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
      createdAt: '2021-10-01T00:00:00.000Z',
    },
    {
      nickname: 't0dd',
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
      createdAt: dayjs(),
    },
  ])
</script>

<template>
  <div
    @click.self="$router.go(-1)"
    class="bg-base-100 fixed left-0 top-0 z-20 flex h-screen w-screen items-center justify-center bg-opacity-80 px-4 py-24 max-[420px]:py-4"
  >
    <div
      class="bg-base-200 flex h-full w-full max-w-[720px] flex-col justify-between rounded-2xl"
    >
      <div class="flex items-center justify-center gap-8 py-2">
        <button class="btn btn-circle btn-sm">
          <icon name="heroicons:chevron-left" class="h-5 w-5" />
        </button>
        <div class="font-bold">
          {{ dayjs(post.createdAt).format('YYYY-MM-DD') }}
        </div>
        <button class="btn btn-circle btn-sm">
          <icon name="heroicons:chevron-right" class="h-5 w-5" />
        </button>
      </div>
      <!-- NOTE: 캐러셀 -->
      <div
        class="bg-base-100 relative max-h-[720px] min-h-[300px] flex-1 overflow-hidden"
      >
        <Carousel :images="post.images" />
        <div
          class="absolute bottom-0 left-0 flex w-full justify-center py-2"
        ></div>
      </div>

      <div class="bg-base-100 flex justify-between px-3 py-2">
        <div class="flex flex-col gap-1">
          <div class="flex items-center gap-2">
            <span class="text-sm font-bold">
              {{ post.nickname }}
            </span>
            <span class="badge badge-primary badge-sm select-none">
              {{
                filterByOptions.find(f => f.value === post.exerciseType).label
              }}
            </span>
          </div>
          <span class="text-xs">
            {{ post.content }}
          </span>
        </div>
      </div>

      <div class="flex flex-col overflow-auto">
        <div
          class="border-base-300 flex flex-col border-b px-3 py-2"
          v-for="(comment, c) in comments"
          :key="c"
        >
          <div class="flex items-center gap-2">
            <span class="text-sm font-bold">{{ comment.nickname }}</span>
            <span class="text-xs text-gray-500">
              <template
                v-if="
                  dayjs(comment.createdAt).format('YYYY-MM-DD') !=
                  dayjs().format('YYYY-MM-DD')
                "
              >
                {{ dayjs(comment.createdAt).format('YYYY-MM-DD') }}
              </template>
              <template v-else>
                {{ dayjs(comment.createdAt).format('HH:mm') }}
              </template>
            </span>
          </div>
          <p class="text-xs">{{ comment.content }}</p>
        </div>
      </div>

      <div class="join px-3 py-4">
        <input
          :disabled="comments.length >= 5"
          v-model="content"
          placeholder="댓글을 작성하세요."
          type="text"
          class="input input-bordered bg-base-200 join-item flex-1 text-sm"
        />
        <button
          class="btn btn-primary join-item"
          :disabled="comments.length >= 5"
        >
          댓글 작성
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
