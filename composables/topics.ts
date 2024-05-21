export const fetchTopics = () => {
  const { data } = useFetch<{topics: Topic[], persons: Person[]}>(
    '/data-collector/icode/test-data/topics.json', 
    {
      baseURL: 'https://atillc.blob.core.windows.net'
    }
  );

  const topics = computed(() => {
    return (data.value ?? {}).topics;
  });

  const persons = computed(() => {
    return (data.value ?? {}).persons;
  })

  return {
    topics,
    persons,
  }
}


export const useTopicsPagination = (topics: Ref<Topic[]> | ComputedRef<Topic[]>) => {
  const pageCount = ref(20);

  const page = ref(1);
  const topicsPaginated = computed(() => {
    let pageFirstItem = pageCount.value * (page.value - 1);

    return (topics.value ?? []).slice(
      pageFirstItem > 0? ++pageFirstItem : 0, 
      pageFirstItem + pageCount.value
    );
  })

  return {
    pageCount,
    page,
    topicsPaginated,
  }
} 