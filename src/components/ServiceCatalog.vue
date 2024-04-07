<template>
  <div>
    <div class="title-wrapper">
      <div>
        <h1>Service Hub</h1>
        <p>
          <span>Organize services, manage and track versioning and API service documentation. </span>
          <span style="color: #1456CB;">Learn more</span>
        </p>
      </div>
      <div class="right-content">
        <ServiceSearch :search-input="searchInput" @search="searchChange" />

        <button class="common-button">
          + Service Package
        </button>
      </div>
    </div>

    <ServiceCardsTable :query="searchInput" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ServiceCardsTable from '@/components/ServiceCardsTable.vue'
import ServiceSearch from '@/components/ServiceSearch.vue'
import { useStore } from '@/stores/store'

export default defineComponent({
  name: 'ServiceCatalog',
  components: { ServiceCardsTable, ServiceSearch },
  setup() {
    const store = useStore()
    const searchInput = ref(store.search)

    return { searchInput, store }
  },
  methods: {
    searchChange(value: string) {
      this.searchInput = value
      this.store.setSearch(value)
    },
  },
})
</script>

<style lang="scss" scoped>
.title-wrapper {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 1.6rem;
  justify-content: space-between;

  .right-content {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
  }
}

</style>
