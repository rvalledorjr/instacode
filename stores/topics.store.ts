import type { Comment } from "#imports";
import { useStorage } from '@vueuse/core';

export const useTopicsStore = defineStore('topics', () => {
  const topicMap = useStorage<{[key: string]: Topic}>('topics', {});
  const topics = computed(() => {
    return Object.values(topicMap.value).toReversed();
  });

  function initTopics(topics: Topic[]) {
    for (const topic of topics) {
      topicMap.value[topic.guid] = topic;
    }
  }

  function addTopic(topic: Topic) {
    topicMap.value[topic.guid] = {
      ...topic,
    };
  }

  function updateTopic(id: string, update: Partial<Topic>) {
    const topic = topicMap.value[id];

    topicMap.value = {
      ...topicMap.value,
      [id]: {
        ...topic,
        ...update,
      }
    };
  }

  function deleteTopic(id: string) {
    delete topicMap.value[id];
  }

  function addComment(topicId: string, comment: Comment) {
    topicMap.value[topicId].comments.push(comment);
  }

  function updateComment(topicId: string, index: number, update: Partial<Comment>) {
    topicMap.value[topicId].comments[index].comment = update.comment ?? '';
  }

  function deleteComment(topicId: string, index: number) {
    topicMap.value[topicId].comments.splice(index, 1);
  }
  
  return {
    initTopics,
    topics,
    addTopic,
    updateTopic,
    deleteTopic,
    addComment,
    updateComment,
    deleteComment,
  }
});