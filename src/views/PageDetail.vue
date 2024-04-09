<template>
  <button class="common-button" @click="backToHome">
    Back to Service Hub
  </button>
  <ServiceVersions />
</template>

<script  lang="ts">
import { defineComponent } from 'vue'
import ServiceVersions from '@/components/ServiceVersions.vue'

export default defineComponent({
  name: 'PageDetail',
  components: { ServiceVersions },
  methods: {
    backToHome() {
      this.$router.push('/')
    },
  },
})
</script>
