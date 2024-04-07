import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStore = defineStore('pagination', () => {
  const page = ref(1) // current page
  const viewIndex = ref(0) // jump from an item to detail page
  const search = ref('')

  const nextPage = () => {
    page.value++
  }

  const prevPage = () => {
    page.value--
  }

  const setViewIndex = (i: number) => {
    viewIndex.value = i
  }

  const setSearch = (s: string) => {
    search.value = s
  }
  return {
    page,
    viewIndex,
    search,
    nextPage,
    prevPage,
    setViewIndex,
    setSearch,
  }
})
