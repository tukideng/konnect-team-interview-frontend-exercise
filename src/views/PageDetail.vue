<template>
  <button class="common-button" @click="backToHome">
    Back to Service Hub
  </button>
  <ServiceVersions :versions="versions" />
</template>

<script  lang="ts">
import { defineComponent, reactive } from 'vue'
import ServiceVersions from '@/components/ServiceVersions.vue'
import type { ServiceVersion } from '@/types/service'

export default defineComponent({
  name: 'PageDetail',
  components: { ServiceVersions },
  setup() {
    const versions:ServiceVersion[] = reactive([])

    return { versions }
  },
  methods: {
    backToHome() {
      this.$router.push('/')
    },
  },
})
</script>
