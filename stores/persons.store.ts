import { useStorage } from '@vueuse/core';

export const usePersonsStore = defineStore('persons', () => {

  const currentPerson = useStorage<Person>('person', {} as any);
  const personMap = useStorage<{[key: string]: Person}>('persons', {});
  
  function initPersons(persons: Person[]) {
    for (const person of persons) {
      personMap.value[person.guid] = person;
    }
  }

  function updatePerson(id: string, update: Partial<Person>) {
    personMap.value[id] = {
      ...personMap.value[id],
      ...update
    }
  }
  
  return {
    currentPerson,
    personMap,
    initPersons,
    updatePerson,
  }
});