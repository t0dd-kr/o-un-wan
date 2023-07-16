<script setup lang="ts">
  const router = useRouter()
  const modal = useModal()

  const { filterByOptions } = storeToRefs(usePost())

  const content = ref('')
  const images = ref([])
  const exerciseType = ref('RUNNING')

  const inputFile = ref<HTMLElement | null>(null)

  const step = ref('IMAGE')

  async function onFileUpload(event) {
    // console.log(event)
    const files = event.target.files

    // files to preview images
    images.value = await Promise.all(
      Array.from(files).map(
        file =>
          new Promise(res => {
            const reader = new FileReader()
            reader.onload = e => {
              res(e.target.result)
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
              router.go(-1)
            },
          },
          {
            label: '취소',
          },
        ],
      })
    } else {
      router.go(-1)
    }
  }

  async function submit() {
    try {
      const res = await $fetch('/posts', {
        method: 'POST',
        body: {
          content: content.value,
          images: images.value,
          exerciseType: exerciseType.value,
        },
      })
    } catch (err) {
      router.push('/')
    }
  }
</script>

<template>
  <div
    @click.self="onCancel"
    class="bg-base-100 fixed left-0 top-0 z-20 flex h-screen w-screen items-center justify-center bg-opacity-80 px-4"
  >
    <div
      class="bg-base-200 flex w-full max-w-[720px] flex-col justify-between rounded-2xl"
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
              @click="submit()"
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
              운동유형
            </div>
            <div class="flex flex-1 flex-wrap justify-end gap-2 p-4">
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
          class="flex h-full w-full flex-col items-center justify-center"
          v-else
        >
          <button
            class="btn btn-primary btn-wide"
            @click="$refs.inputFile.click()"
          >
            사진 업로드
            <input
              @change="onFileUpload"
              type="file"
              class="hidden"
              ref="inputFile"
              multiple
              accept="image/*"
            />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>