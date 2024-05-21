<script lang="ts" setup>
const searchText = ref();
</script>

<template>
  <div>
    <div class="sticky top-0 backdrop-blur border-solid border-b-[1px] border-gray-200 dark:border-gray-800 z-50">
      <div class="flex w-full lg:max-w-3xl lg:mx-auto px-5 py-3">
        <NuxtLink to="/" class="text-xl lg:text-2xl font-semibold mr-2">
          Instacode
        </NuxtLink>
        <div class="ml-auto">
          <ThemeSwitchButton />
        </div>
      </div>
    </div>
    <div class="w-full lg:max-w-3xl lg:mx-auto px-5 py-3 mt-3">
      <slot />
    </div>
  </div>
</template>

<style scoped></style>