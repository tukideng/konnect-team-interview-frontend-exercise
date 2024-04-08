<script setup lang="ts">
import type { ServiceDetail } from '@/types/service'
import { computed } from 'vue'

const props = defineProps<{ service: ServiceDetail }>()

const hasMultipleVersions = props.service.versions.length > 1

const avatarList = props.service.versions.map((version) => {
  return version.developer?.avatar
}).filter((avatar) => avatar)

const uniqueAvatarList = Array.from(new Set(avatarList))

const transformMetric = computed(() => (key:string) => {
  const metrics = props.service.metrics
  switch (key) {
    case 'latency':
      return `${metrics.latency}ms`
    case 'uptime':
      return `${(metrics.uptime * 100).toFixed(2)}%`
    case 'requests':
      return `${(metrics.requests / 1000).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}k`
    case 'errors':
      return `${(metrics.errors * 100).toFixed(2)} %`
    default:
      return ''
  }
})

</script>

<template>
  <div class="service-card">
    <div class="header-info">
      <span>
        <i v-if="service.published" class="bi bi-check-lg" />
        <i v-else class="bi bi-x-lg" />
        {{ service.published ? 'Published to portal':'Unpublished' }}
      </span>
      <span v-if="service.versions.length > 0" class="version">
        {{ service.versions.length }} {{ hasMultipleVersions ? 'versions': 'version' }}
      </span>
    </div>
    <p class="name">
      {{ service.name }}
    </p>
    <div style="flex: 1;">
      <p class="description">
        {{ service.description }}
      </p>
    </div>
    <div class="footer-info">
      <div>
        <template v-if="service.configured">
          <p class="metric-info-active">
            {{ transformMetric('latency') }} <span>latency</span>
          </p>
          <p class="metric-info-active">
            {{ transformMetric('uptime') }} <span>uptime</span>
          </p>

          <p class="metric-info-active">
            {{ transformMetric('requests') }} <span>requests</span> · {{ transformMetric('errors') }} <span>errors</span>
          </p>
        </template>
        <template v-else>
          <span class="metric-info-disactive">
            Not configured with runtime yet
          </span>
        </template>
      </div>
      <div v-if="uniqueAvatarList.length">
        <div
          v-if="uniqueAvatarList.length > 2"
          class="more-avatar"
        >
          + {{ uniqueAvatarList.length - 2 }}
        </div>
        <template
          v-for="(avatar,index) of uniqueAvatarList"
          :key="avatar"
        >
          <img
            v-if="index < 2"
            class="avatar"
            :src="avatar"
            width="36px"
          >
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

.service-card {
  background-color: white;
  border-radius: var(--small-border-radius);
  display: flex;
  flex-direction: column;
  font-size: 1.2rem;
  gap: .4rem;
  height: 20rem;
  padding: 1.6rem;
  transition: box-shadow 0.3s ease-in-out;
  .header-info {
    align-items: center;
    display: flex;
    font-weight: 400;
    justify-content: space-between;
    .bi-check-lg {
      color: #14B59A;
      font-size: 1.8rem;
      margin-right: .5rem;
    }
    .bi-x-lg {
      color: #ADB6C8;
      font-size: 1.4rem;
      margin-right: .5rem;
    }
  }
  .version {
    background-color: var(--badge-background-color);
    border-radius: 10rem;
    color:  var(--badge-text-color);
    font-size: 1.3rem;
    font-weight: 600;
    padding: .8rem 1.8rem;
    text-align: center;
  }
  .name {
    font-size: 2rem;
    line-height: 2.4rem;
  }
  .description {
    -webkit-box-orient: vertical;
    color: var(--info--text-color1);
    display: -webkit-box;
    font-size: 1.3rem;
    font-weight: 400;
    -webkit-line-clamp: 4;
    line-height: 2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
  }
  %metric-info {
    font-weight: 600;
    line-height: 1.6rem;
    span {
      color: var(--info--text-color1);
    }
    &::before {
      border-radius: var(--rounded-border-radius);
      content: '';
      display: inline-block;
      height: .6rem;
      margin-bottom: .3rem;
      margin-right: .8rem;
      width: .6rem
    }
  }
  .metric-info-active {
    @extend %metric-info;
    &::before {
      background-color: #42D782;
    }
  }
  .metric-info-disactive {
    @extend %metric-info;
    &::before {
      background-color: #B6B6BD;
    }
  }
  .more-avatar {
    background-color: #F1F1F8;
    border: 2px solid white;
    border-radius: var(--rounded-border-radius);
    display: inline-block;
    font-size: 1.2rem;
    height: 3.4rem;
    line-height: 3.4rem;;
    margin-left: -1.2rem;
    position: relative;
    text-align: center;
    vertical-align: top;
    width: 3.4rem;
    z-index: 10;
  }
  .avatar {
    border-radius: var(--rounded-border-radius);
    margin-left:  -1.2rem;
    position: relative;
    z-index: 5;
    &:last-child {
      z-index: 3;
    }
  }
  .footer-info {
    align-items: end;
    display: flex;
    gap: .8rem;
    justify-content: space-between;
  }
  &:hover {
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);
    cursor: pointer;
  }
}

</style>
