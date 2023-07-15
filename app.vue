<script setup lang="ts"></script>

<template>
  <Html lang="ko" dir="ltr">
    <Head>
      <Title>O-UN-WAN</Title>
      <Link rel="icon" href="/favicon.png" />
      <Meta charset="utf-8" />
      <Meta
        name="viewport"
        content="width=device-width, initial-scale=1, viewport-fit=cover"
      />
    </Head>
    <Body data-theme="light">
      <NuxtLayout>
        <NuxtPage :page-key="$route.fullPath" />
      </NuxtLayout>
    </Body>
  </Html>
</template>

<style scoped lang="scss">
  $w: 1px;
</style>
