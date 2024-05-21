<script lang="ts" setup>
import type { Comment } from '#imports';

const props = withDefaults(
  defineProps<{
    modelValue: Comment,
  }>(),
  {}
);

const emits = defineEmits<{
  'update:model-value': [string];
  'cancel:model-value': [void];
}>();

const show = ref(false);
const comment = ref('');
watch(
  () => props.modelValue,
  (modelValue) => {
    comment.value = modelValue.comment;
  },
  {
    immediate: true,
  }
)

function updateTopic() {
  emits('update:model-value', comment.value);
  show.value = false;
}

function cancel() {
  comment.value = props.modelValue.comment;
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
          v-model="comment" 
          autoresize 
          :ui="{
            base: '!text-base'
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
