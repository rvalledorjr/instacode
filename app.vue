<script setup lang="ts">
const topicsStore = useTopicsStore();
const personsStore = usePersonsStore();
if (
  topicsStore.topics.length === 0 ||
  Object.values(personsStore.personMap).length === 0
) {
  const { topics, persons } = fetchTopics();

  watchOnce(topics, (topics) => {
    if (!topics) {
      return;
    }
    topicsStore.initTopics(topics);
  });
  watchOnce(persons, (persons) => {
    if (!persons) {
      return;
    }
    const currentPerson = {
      email: 'anonymous@mail.com',
      first: 'Anonymous',
      last: 'Participant',
      guid: 'ap'
    };
    personsStore.initPersons([
      ...persons,
      currentPerson,
    ]);
    personsStore.currentPerson = currentPerson;
  });
}
</script>

<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
