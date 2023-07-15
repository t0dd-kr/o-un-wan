<script setup lang="ts">
  type Props = {
    images: string[]
  }

  defineProps<Props>()

  const carouselIndex = ref(0)
</script>

<template>
  <div class="relative h-full w-full">
    <div
      class="flex h-full transition-transform duration-300 ease-in-out"
      :style="{
        transform: `translateX(-${(carouselIndex * 100) / images.length}%)`,
        width: `${images.length * 100}%`,
      }"
    >
      <div
        class="h-full w-full bg-contain bg-center bg-no-repeat"
        v-for="(image, index) in images"
        :key="index"
        :style="`background-image: url(${image})`"
      />
    </div>

    <div
      class="pointer-events-none absolute left-0 top-0 flex h-full w-full items-center justify-between px-4"
    >
      <button
        class="btn btn-circle btn-sm pointer-events-auto"
        @click="carouselIndex--"
        v-if="carouselIndex > 0"
      >
        <icon name="heroicons:chevron-left" class="h-6 w-6" />
      </button>
      <div v-else></div>
      <button
        class="btn btn-circle btn-sm pointer-events-auto"
        @click="carouselIndex++"
        v-if="carouselIndex < images.length - 1"
      >
        <icon name="heroicons:chevron-right" class="h-6 w-6" />
      </button>
      <div v-else></div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
