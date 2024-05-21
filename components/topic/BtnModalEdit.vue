<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    modelValue: Topic,
  }>(),
  {}
);

const emits = defineEmits<{
  'updated:model-value': [void];
  'cancel:model-value': [void];
}>();

const topicsStore = useTopicsStore();

const show = ref(false);
const name = ref('');
watch(
  () => props.modelValue,
  (modelValue) => {
    name.value = modelValue.name;
  },
  {
    immediate: true,
  }
)

function updateTopic() {
  topicsStore.updateTopic(props.modelValue.guid, {name: name.value});
  emits('updated:model-value');
}

function cancel() {
  name.value = props.modelValue.name;
  emits('cancel:model-value');
  show.value = false;
}
</script>

<template>
  <UButton 
    icon="mdi:pencil" label="Edit" 
    @click="show = true"
  />
  <UModal 
    v-model="show" 
  >
    <UCard>
      <template #header>
        Edit Topic
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
            icon="mdi:pencil" label="Edit" 
            @click="updateTopic()"
          />
        </div>
      </div>
    </UCard>
  </UModal>
</template>

<style scoped></style>
