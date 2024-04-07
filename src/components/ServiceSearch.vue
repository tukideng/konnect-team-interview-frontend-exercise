<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps<{ searchInput?: string }>()

const emit = defineEmits(['search'])

const searchQuery = ref(props.searchInput)

function inputChange() {
  emit('search', searchQuery.value)
}

</script>

<template>
  <div class="input-wrapper">
    <i class="bi bi-search" />
    <input
      v-model="searchQuery"
      class="search-input"
      data-testid="search-input"
      placeholder="Search services"
      @change="inputChange"
    >
  </div>
</template>

<style lang="scss" scoped>
.input-wrapper {
  align-items: center;
  background-color: white;
  border: 1px solid var(--input-border-color);
  border-radius: 0.4rem;
  color: #6F7787;
  display: flex;
  gap: 0.8rem;
  height: 4.4rem;
  line-height: 4.4rem;
  padding: 0 1.2rem;
  width: 20.9rem;
  input {
    border: none;
    font-size: 1.6rem;
    height: 100%;
    padding: 0;
    width: 100%;
    &:focus {
      outline: none;
    }
  }
}

</style>
