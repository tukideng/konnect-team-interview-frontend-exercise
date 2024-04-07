<script setup lang="ts">
import useServices from '@/composables/useServices'
import ServiceCard from '@/components/ServiceCard.vue'
import { computed, onMounted, watch } from 'vue'
import router from '@/router'
import { useStore } from '@/stores/store'

const props = defineProps<{ query?: string }>()

const { services, getServices } = useServices(props.query)

const store = useStore()

const start = computed(() => store.page * 9 - 8)
const end = computed(() => start.value + 8 > services.value.length ? services.value.length : start.value + 8)

const currentServices = computed(() => {
  return services.value.slice(start.value - 1, end.value)
})

onMounted(() => {
  setTimeout(() => {
    const element = document.querySelector(`.catalog li:nth-child(${store.viewIndex + 1})`)
    element?.scrollIntoView({ block: 'center' })
  }, 100)
})

watch(() => props.query, () => {
  getServices(props.query)
  store.page = 1
})

function viewServiceVersions(id: string, i: number) {
  router.push(`/service/${id}`)
  store.setViewIndex(i)
}

</script>

<template>
  <div>
    <template v-if="services.length">
      <ul class="catalog">
        <li
          v-for="(service, i) in currentServices"
          :key="service.id"
          @click="viewServiceVersions(service.id, i)"
        >
          <ServiceCard :service="service" />
        </li>
      </ul>
      <div class="pagination">
        <button
          :class="[start === 1 ? 'disabled-btn' : 'active-btn ']"
          :disabled="start === 1"
          @click="store.prevPage()"
        >
          <i class="bi bi-arrow-left" />
        </button>
        <p>
          <span style="font-weight: 600;">{{ start }} to {{ end }}</span>
          <span style="color: #707888;"> of {{ services.length }} services</span>
        </p>
        <button
          :class="[end >= services.length ? 'disabled-btn' : 'active-btn ']"
          :disabled="end >= services.length"
          @click="store.nextPage()"
        >
          <i class="bi bi-arrow-right" />
        </button>
      </div>
    </template>

    <div v-else class="no-results" data-testid="no-results">
      No services
    </div>
  </div>
</template>

<style lang="scss" scoped>
ul,li {
  padding-inline-start: 0;
}
.catalog {
  display: grid;
  grid-gap: 36px;
  grid-template-columns: repeat(3, minmax(324px, 1fr));
  list-style: none;
  margin-top: 36px;
}
.no-results {
  margin-top: 36px;
  text-align: center;
}

.pagination {
  align-items: center;
  display: flex;
  font-size: 1.3rem;
  justify-content: center;
  margin-top: 24px;
  text-align: center;
  %pagination-btn {
    background-color: transparent;
    border: 1px solid #E0E4EE;
    border-radius: 100%;
    cursor: pointer;
    font-size: 1.4rem;
    height: 4.4rem;
    margin: 1rem;
    width: 4.4rem;

  }
  .active-btn {
    @extend %pagination-btn;
    border-color: #A6C6FF;
    color: #1456CB;
  }

  .disabled-btn {
    @extend %pagination-btn;
    border-color: #0000001A;
    color: #00000040;
    cursor: not-allowed;
  }
}

// 大于1210 展示3列，小于1210 大于 768 展示2列，小于768 展示1列
@media (max-width: 1210px) {
  .catalog {
    grid-template-columns: repeat(2, minmax(324px, 1fr));
  }
}

@media (max-width: 768px) {
  .catalog {
    grid-template-columns: repeat(1, minmax(324px, 1fr));
  }
}

</style>
