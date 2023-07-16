<script setup lang="ts">
  const { show, title, content, buttons } = storeToRefs(useModal())
  const { close } = useModal()
</script>

<template>
  <div
    v-if="show"
    @click.self="close()"
    class="bg-base-100 fixed left-0 top-0 z-20 flex h-screen w-screen items-center justify-center bg-opacity-80"
  >
    <div
      class="bg-base-200 flex min-w-[360px] max-w-full flex-col rounded-2xl text-center shadow"
    >
      <div class="flex flex-col gap-2 border-b border-gray-800 px-8 py-6">
        <span class="font-bold">{{ title }}</span>
        <span class="text-xs">{{ content }}</span>
      </div>
      <button
        v-for="(button, b) in buttons"
        :key="b"
        class="border-gray-800 py-3 text-sm"
        :class="[
          button.class,
          {
            'border-b': b < buttons.length - 1,
          },
        ]"
        @click="button.cb?.(), close()"
      >
        {{ button.label }}
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
