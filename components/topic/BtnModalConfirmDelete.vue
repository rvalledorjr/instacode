<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    modelValue: Topic,
  }>(),
  {}
);

const emits = defineEmits<{
  'deleted:model-value': [void];
  'cancel:model-value': [void];
}>();

const topicsStore = useTopicsStore();

const show = ref(false);

function deleteTopic() {
  topicsStore.deleteTopic(props.modelValue.guid);
  emits('deleted:model-value');
}

function cancel() {
  emits('cancel:model-value');
  show.value = false;
}
</script>

<template>
  <UButton 
    icon="mdi:trash-can-outline" color="red" label="Delete" 
    @click="show = true"
  />
  <UModal 
    v-model="show"
  >
    <UCard>
      <div>
        <div>Do you want to delete this topic?</div>
        <div class="font-semibold my-3">{{ modelValue.name }}</div>
        <div class="mt-5 flex space-x-3 justify-end">
          <UButton 
            label="Cancel" 
            variant="outline"
            @click="cancel()"
          />
          <UButton 
            icon="mdi:trash-can-outline" color="red" label="Delete" 
            @click="deleteTopic()"
          />
        </div>
      </div>
    </UCard>
  </UModal>
</template>

<style scoped></style>
