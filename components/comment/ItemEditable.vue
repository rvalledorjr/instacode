<script lang="ts" setup>
import type { Comment } from '#imports';
import { formatDate } from '@vueuse/core';

const props = withDefaults(
  defineProps<{
    modelValue: Comment
  }>(),
  {}
);

const emits = defineEmits<{
  'update:model-value': [string];
  'delete:model-value': [void];
}>();

const personsStore = usePersonsStore();

const personFullName = computed(() => {
  const {first, last} = personsStore.personMap[props.modelValue.by];
  return `${first} ${last}`;
});

const date = formatDate(new Date(props.modelValue.date), 'MMM D YYYY, hh:mm a');
</script>

<template>
  <div class="flex space-x-3">
    <UAvatar :alt="modelValue.by" size="md"/>
    <div class="w-full">
      <div class="text-md font-semibold mb-1 flex">
        {{ personFullName }}
        <span class="ml-auto font-thin italic text-sm">
          {{ date }}
        </span>
      </div>
      <div class="w-full">{{ modelValue.comment }}</div>
    </div>

    <UPopover mode="click">
      <UButton icon="mdi:dots-vertical" variant="ghost" />
      <template #panel="{ close }">
        <div class="p-2">
          <div class="flex flex-col space-y-3">
            <CommentBtnModalEdit 
              :model-value="modelValue"
              @update:model-value="(arg) => {
                close();
                emits('update:model-value', arg);
              }"
            />
            <CommentBtnModalConfirmDelete 
              :model-value="modelValue" 
              @delete:model-value="() => {
                close();
                emits('delete:model-value');
              }"
            />
          </div>
        </div>
      </template>
    </UPopover>
  </div>
</template>

<style scoped></style>
