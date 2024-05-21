<script lang="ts" setup>
definePageMeta({
  layout: 'home',
  scrollToTop: true,
});

const topicsStore = useTopicsStore();

const topics = computed(() => {
  return topicsStore.topics
});

const { page, topicsPaginated, pageCount } = useTopicsPagination(topics);

const route = useRoute();
watch(
  () => [route.name, route.query.page],
  ([routeName, pageNumber]) => {
    if (routeName !== 'topics') {
      return;
    }
    page.value = Number(pageNumber);

    window.scrollTo(0, 0);
  },
  {immediate: true}
)
</script>

<template>
  <h1 class="text-2xl mb-5 flex items-center">
    Topics

    <TopicBtnModalCreate />
  </h1>

  <div class="space-y-5">
    <template
      v-for="topic of topicsPaginated"
    >
      <TopicCardCommentable 
        :model-value="topic"
      />  
    </template>

    <div class="flex justify-center">
      <UPagination 
        v-if="topics?.length && topics?.length > 0"
        v-model="page"
        :page-count="pageCount"
        :total="topics?.length"
        :to="(page: number) => ({
          name: 'topics',
          query: { page }
        })"
        class="py-5"
      />
    </div>
  </div>
</template>

<style scoped></style>
