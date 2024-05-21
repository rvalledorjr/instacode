<script lang="ts" setup>
const show = ref(false);

const personsStore = usePersonsStore();
const topicsStore = useTopicsStore();

const name = ref('');

const route = useRoute();

function createTopic() {
  topicsStore.addTopic({
    guid: self.crypto.randomUUID(),
    name: name.value,
    comments: []
  });
  
  if (route.name === 'topics' && Number(route.query.page) > 1) {
    navigateTo({
      name: 'topics',
      query: {
        page: 1
      }
    });
  }

  name.value = '';
  show.value = false;
  
}

function cancel() {
  name.value = '';
  show.value = false;
}
</script>

<template>
  <UButton icon="mdi:plus" size="lg" class="ml-auto" @click="show = true">
    Create
  </UButton>
  
  <UModal 
    v-model="show" 
  >
    <UCard>
      <template #header>
        New Topic
      </template>
      <div>
        <UTextarea 
          v-model="name" 
          autoresize 
          :maxlength="50"
          :ui="{
            base: '!text-lg'
          }"
        ></UTextarea>
        <div class="mt-5 flex space-x-3 justify-end">
          <UButton 
            label="Cancel" 
            variant="outline"
            @click="cancel()"
          />
          <UButton 
            label="Create" 
            @click="createTopic()"
          />
        </div>
      </div>
    </UCard>
  </UModal>
</template>

<style scoped></style>
