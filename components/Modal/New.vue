<script setup lang="ts">
  import * as filestack from 'filestack-js'

  const { FILESTACK_API_KEY } = useRuntimeConfig().public

  const router = useRouter()
  const modal = useModal()

  const { filterByOptions } = storeToRefs(usePost())
  const { getPosts } = usePost()

  const content = ref('')
  const images = ref<string[]>([])
  const files = ref<File[]>([])
  const exerciseType = ref('RUNNING')

  const inputFile = ref<HTMLElement | null>(null)

  const step = ref('IMAGE')

  async function onFileUpload(event: any) {
    // console.log(event)
    files.value = Array.from(event.target.files).slice(0, 5) as File[]

    // files to preview images
    images.value = await Promise.all<string>(
      files.value.map(
        file =>
          new Promise(res => {
            const reader = new FileReader()
            reader.onload = e => {
              res(e.target?.result as string)
            }
            reader.readAsDataURL(file)
          }),
      ),
    )
  }

  async function onCancel() {
    if (images.value.length > 0) {
      modal.open({
        title: '게시글 작성을 취소하시겠습니까?',
        content: '작성 중인 게시글은 삭제됩니다.',
        buttons: [
          {
            label: '삭제',
            class: 'text-accent',
            cb: () => {
              router.push('/')
            },
          },
          {
            label: '취소',
          },
        ],
      })
    } else {
      router.push('/')
    }
  }

  async function uploadImages() {
    const client = filestack.init(FILESTACK_API_KEY)
    let datas = await Promise.all(files.value.map(file => client.upload(file)))

    return datas.map((data: any) => data.url)
  }

  async function createPost() {
    const images = await uploadImages()

    try {
      await $fetch('/api/posts', {
        method: 'POST',
        body: {
          images,
          content: content.value,
          exerciseType: exerciseType.value,
        },
      })
    } catch (err) {
      console.log(err)
    }

    await getPosts(true)

    router.push('/')
  }
</script>

<template>
  <div
    @click.self="onCancel"
    class="bg-base-100 fixed left-0 top-0 z-20 flex h-screen w-screen items-center justify-center bg-opacity-80 px-5 max-[420px]:px-3"
  >
    <div
      class="bg-base-200 flex w-full max-w-[720px] flex-col justify-between overflow-hidden rounded-2xl"
    >
      <div class="relative flex items-center justify-center gap-8 px-3 py-3">
        게시글 작성
        <div
          class="absolute left-0 top-0 flex h-full w-full select-none items-center justify-between px-3 text-sm"
        >
          <template v-if="step == 'CONTENT'">
            <button class="px-1 text-sm" @click="step = 'IMAGE'">이전</button>
            <button
              class="px-1 text-sm"
              :class="{
                'cursor-not-allowed text-gray-500': !exerciseType,
                'text-primary': exerciseType,
              }"
              :disabled="!exerciseType"
              @click="createPost()"
            >
              공유
            </button>
          </template>
          <template v-else-if="images.length > 0">
            <button class="px-1 text-sm" @click="images = []">이전</button>
            <button class="text-primary px-1 text-sm" @click="step = 'CONTENT'">
              다음
            </button>
          </template>
        </div>
      </div>
      <div class="bg-base-100 aspect-square w-full">
        <div
          class="flex h-full w-full flex-col items-center justify-center"
          v-if="step == 'CONTENT'"
        >
          <div
            class="flex w-full items-center justify-between gap-2 px-4 text-sm"
          >
            <div class="flex h-full items-start justify-start py-4">
              운동 유형
            </div>
            <div class="flex flex-1 flex-wrap justify-end gap-2 py-4">
              <button
                class="badge"
                v-for="option in filterByOptions.filter(
                  option => option.value != 'ALL',
                )"
                @click="exerciseType = option.value"
                :class="{
                  'badge-primary': exerciseType == option.value,
                }"
              >
                {{ option.label }}
              </button>
            </div>
          </div>
          <div class="w-full flex-1 p-2">
            <textarea
              class="textarea bg-base-100 h-full w-full resize-none p-2"
              v-model="content"
              placeholder="내용을 입력하세요"
            />
          </div>
        </div>
        <Carousel :images="images" v-else-if="images.length > 0" />
        <div
          class="flex h-full w-full flex-col items-center justify-center px-4"
          v-else
        >
          <button
            class="btn btn-primary min-[421px]:btn-wide max-[420px]:btn-sm max-w-full"
            @click=";($refs.inputFile as HTMLElement).click()"
          >
            사진 업로드
            <input
              @change="onFileUpload"
              type="file"
              class="hidden"
              ref="inputFile"
              multiple
              accept="image/png, image/jpeg, image/jpg, image/gif, image/webp"
            />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
