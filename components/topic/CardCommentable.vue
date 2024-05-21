<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    modelValue: Topic,
  }>(),
  {}
);

const personsStore = usePersonsStore();
const topicsStore = useTopicsStore();

const newComment = ref('');
function addComment() {
  topicsStore.addComment(
    props.modelValue.guid,
    {
      comment: newComment.value,
      date: new Date(),
      by: personsStore.currentPerson?.guid as string,
    }
  )

  newComment.value = '';
}

const { fullName } = usePerson(toRef(personsStore.currentPerson!));
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex">
        <div class="text-xl w-full">
          {{ modelValue.name }}
        </div>
        <UPopover mode="click">
          <UButton icon="mdi:dots-vertical" variant="ghost" />
          <template #panel="{ close }">
            <div class="p-2">
              <div class="flex flex-col space-y-3">
                <TopicBtnModalEdit
                  :model-value="modelValue"
                  @updated:model-value="close()"
                  @cancel:model-value="close()"
                />
                <TopicBtnModalConfirmDelete 
                  :model-value="modelValue"
                  @deleted:model-value="close()"
                  @cancel:model-value="close()"
                />
              </div>
            </div>
          </template>
        </UPopover>
      </div>
    </template>
    
    <template v-if="(modelValue.comments ?? []).length > 0"  #default>
      <div class="space-y-5">
        <div v-for="(comment, i) of modelValue.comments" :key="i">
          <CommentItemEditable 
            :model-value="comment" 
            @update:model-value="arg => topicsStore.updateComment(modelValue.guid, i, { comment: arg})"
            @delete:model-value="topicsStore.deleteComment(modelValue.guid, i)"  
          />
          <UDivider v-if="i !== modelValue.comments.length - 1" class="my-3"/>
        </div>
      </div>
    </template>

    <template #footer>
      <div class="space-y-3">
        <div class="flex space-x-3">
          <UAvatar :alt="personsStore.currentPerson?.guid" size="md"/>
          <div class="w-full">
            <div class="mb-2"> {{ fullName }} </div>
            <UTextarea 
              v-model="newComment"
              placeholder="Write comment..." 
              autoresize
            ></UTextarea>
          </div>
        </div>
        <div class="flex justify-end">
          <UButton @click="addComment()">
            Comment
          </UButton>
        </div>
      </div>
    </template>
  </UCard>
</template>

<style scoped></style>
