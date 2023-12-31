<script setup lang="ts">
  import { Post } from '@/entities/post.entity'

  const { filterByOptions, posts } = storeToRefs(usePost())
  const { getPosts } = usePost()

  const route = useRoute()
  const modal = useModal()

  const { refresh, data: post } = useAsyncData<Post>('post', () =>
    $fetch(`/api/posts/${route.params.postUid}`),
  )

  const currentPostIndex = computed(() => {
    return posts.value.findIndex(post => post.uid === route.params.postUid)
  })

  const prevPost = computed(() => {
    if (currentPostIndex.value === 0) {
      return null
    }

    return posts.value[currentPostIndex.value - 1]
  })

  const nextPost = computed(() => {
    if (currentPostIndex.value === posts.value.length - 1) {
      return null
    }

    return posts.value[currentPostIndex.value + 1]
  })

  async function submitComment() {
    if (!content.value) {
      modal.open({
        title: '댓글 작성',
        content: '댓글 내용을 입력해주세요.',
        buttons: [
          {
            label: '확인',
            class: 'text-primary',
          },
        ],
      })
      return
    }

    await $fetch(`/api/posts/${route.params.postUid}/comments`, {
      method: 'POST',
      body: {
        content: content.value,
      },
    })

    content.value = ''

    refresh()
  }

  const content = ref('')
</script>

<template>
  <div
    @click.self=";(post = null), $router.push('/')"
    class="bg-base-100 fixed left-0 top-0 z-20 flex h-screen w-screen items-center justify-center bg-opacity-80 px-4 py-8"
  >
    <div
      class="bg-base-200 flex h-full w-full max-w-[720px] flex-col justify-between rounded-2xl max-[420px]:h-auto max-[420px]:max-h-full"
    >
      <div class="flex h-full flex-col gap-0">
        <div class="flex h-12 items-center justify-center gap-8 py-2">
          <button
            class="btn btn-circle btn-sm"
            :disabled="!prevPost"
            @click="$router.push(`/${prevPost?.uid}`)"
          >
            <Icon name="heroicons:chevron-left" class="h-5 w-5" />
          </button>
          <div class="flex flex-col font-bold" v-if="post?.createdAt">
            {{ dayjs(post?.createdAt).format('YYYY-MM-DD') }}
            <span class="text-center text-xs font-normal text-gray-400">
              {{ dayjs(post?.createdAt).format('HH:mm') }}
            </span>
          </div>
          <button
            class="btn btn-circle btn-sm"
            :disabled="!nextPost"
            @click="$router.push(`/${nextPost?.uid}`)"
          >
            <Icon name="heroicons:chevron-right" class="h-5 w-5" />
          </button>
        </div>

        <div class="flex aspect-[4/3] max-h-[60vw] min-h-[300px] flex-col">
          <div class="bg-base-100 relative flex-1">
            <Carousel :images="post?.images || []" />
            <div
              class="absolute bottom-0 left-0 flex w-full justify-center py-2"
            ></div>
          </div>

          <div class="bg-base-100 flex justify-between px-3 py-2">
            <div class="flex flex-col gap-1">
              <div class="flex items-center gap-2">
                <span class="text-sm font-bold">
                  {{ post?.identify }}
                </span>
                <span class="badge badge-primary badge-sm select-none">
                  {{
                    filterByOptions.find(f => f.value === post?.exerciseType)
                      ?.label
                  }}
                </span>
              </div>
              <span class="text-xs">
                {{ post?.content }}
              </span>
            </div>
          </div>
        </div>

        <div class="flex flex-col">
          <span class="text-primary px-3 pt-2 text-xs font-bold">
            댓글 ({{ post?.comments?.length }})
          </span>
          <div class="max-h-[24vh] overflow-auto">
            <div
              class="border-base-300 flex flex-col border-b px-3 py-2"
              v-for="(comment, c) in post?.comments || []"
              :key="c"
            >
              <div class="flex items-center gap-2">
                <span class="text-sm font-bold">{{ comment.identify }}</span>
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
              <p class="break-all text-xs">{{ comment.content }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="join w-full px-3 py-4" v-if="post?.comments">
        <input
          :disabled="post?.comments.length >= 5"
          v-model="content"
          placeholder="댓글을 작성하세요."
          type="text"
          class="input input-bordered bg-base-200 join-item flex-1 text-sm"
        />
        <button
          class="btn btn-primary join-item"
          :disabled="post?.comments.length >= 5"
          @click="submitComment()"
        >
          댓글 작성
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
