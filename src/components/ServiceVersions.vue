<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import useServices from '@/composables/useServices'

const route = useRoute()
const id = route.params.id as string
const { services } = useServices(id)
const service = computed(() => services.value[0])

const daysBefore = computed(() => (date: string) => {
  const now = new Date()
  const dateObj = new Date(date)
  const diff = now.getTime() - dateObj.getTime()
  return Math.floor(diff / (1000 * 60 * 60 * 24))
})

</script>

<template>
  <div class="service-versions">
    <p class="title">
      Versions ({{ service?.versions?.length || 0 }})
    </p>

    <div class="service-version-table">
      <table>
        <tbody>
          <tr
            v-for="version of service?.versions"
            :key="version.id"
            class="service-version-line"
          >
            <td>
              <span>v{{ version.name }}</span>
            </td>
            <td>
              <span>{{ version.description }}</span>
            </td>
            <td>
              <span :class="['service-type', 'service-type-'+service?.type]">{{ service?.type }}</span>
            </td>
            <td>
              <div class="developer">
                <img
                  v-if="version.developer?.avatar"
                  alt="avatar"
                  class="avatar"
                  :src="version.developer.avatar"
                  width="20px"
                >
                <div>
                  <span class="developer-name">{{ version.developer?.name }}</span>

                  <p class="days-before">
                    {{ daysBefore(version.updated_at) }} days ago
                  </p>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.service-versions {
  background-color: white;
  border-radius: 4px;
  padding: 16px 24px;
  .title {
    color: #0B172D;
    font-size: 1.6rem;
    font-weight: 600;
    line-height: 2.4rem;
  }
  .service-version-table {
    overflow: auto;
    table {
      border-collapse: collapse;
      min-width: 68rem;
      width: 100%;
    }

    .service-version-line  {
      border-bottom: 1px solid #F1F1F5;

      &:last-child {
        border-bottom: none;
      }

      td {
        font-weight: 400;
        padding: 16px 8px;

        &:first-child {
          color: #262626;
          font-size: 1.3rem;
          font-weight: 600;
          min-width: 6rem;
          width: 10%;
        }

        &:nth-child(2) {
          color: #8A8A8A;
          font-size: 1.2rem;
        }

        &:nth-child(3) {
          font-size: 1rem;
          font-weight: 500;
          min-width: 5rem;
          width: 10%;
        }

        &:last-child {
          min-width: 15rem;
          width: 20%;
        }
      }

      .service-type {
        border-radius: 4px;
        color: #1155CB;
        font-size: 1rem;
        padding: 4px 6px;
      }

      .service-type-HTTP {
        background-color: #F8F8FA;
      }

      .service-type-REST {
        background-color: #BDD3F9;
        color: #1155CB;
      }

      .developer {
        align-items: start;
        display: flex;
        gap: 1rem;
      }

      .avatar {
        border-radius: 100%;
      }

      .developer-name {
        font-size: 1.3rem;
        font-weight: 600;
      }

      .days-before {
        color: #8A8A8A;
        font-size: 1.2rem;
        margin-top: .4rem;
      }
    }
  }
}

</style>
