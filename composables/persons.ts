export const usePerson = (person: Ref<Person>) => {
  const fullName = computed(() => {
    return `${person.value.first} ${person.value.last}`;
  })
  
  return {
    fullName,
  };
}