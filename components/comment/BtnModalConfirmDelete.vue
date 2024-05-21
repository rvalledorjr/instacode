<script lang="ts" setup>
import type { Comment } from '#imports';

const props = withDefaults(
  defineProps<{
    modelValue: Comment,
  }>(),
  {}
);

const emits = defineEmits<{
  'delete:model-value': [void];
  'cancel:model-value': [void];
}>();

const show = ref(false);

function deleteComment() {
  emits('delete:model-value');
  show.value = false;
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
        <div>Do you want to delete this comment?</div>
        <div class="font-semibold my-3">{{ modelValue.comment }}</div>
        <div class="mt-5 flex space-x-3 justify-end">
          <UButton 
            label="Cancel" 
            variant="outline"
            @click="cancel()"
          />
          <UButton 
            icon="mdi:trash-can-outline" color="red" label="Delete" 
            @click="deleteComment()"
          />
        </div>
      </div>
    </UCard>
  </UModal>
</template>

<style scoped></style>
