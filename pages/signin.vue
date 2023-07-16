<script setup lang="ts">
  definePageMeta({
    layout: 'signin',
  })

  const { requestSignin } = useUser()
  const modal = useModal()

  const identify = ref('')

  async function signin() {
    if (!identify.value) {
      modal.open({
        title: '로그인',
        content: '아이디를 입력 후 로그인해주세요.',
        buttons: [
          {
            label: '확인',
            class: 'text-primary',
          },
        ],
      })
      return
    }

    await requestSignin(identify.value)

    location.href = '/'
  }
</script>

<template>
  <div class="flex h-screen items-center justify-center">
    <div
      class="flex h-full w-1/5 min-w-[360px] flex-col items-center justify-center px-4 max-[420px]:w-full max-[420px]:min-w-0"
    >
      <img src="@/assets/images/logo_big.png" alt="o-un-wan" class="mb-10" />
      <div class="flex w-full flex-col gap-4">
        <div class="form-control">
          <label class="label">
            <span class="label-text">아이디</span>
          </label>
          <input
            v-model="identify"
            type="text"
            placeholder="fittrix"
            class="input input-bordered"
          />
        </div>
        <button class="btn btn-primary flex-1" @click="signin()">로그인</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
