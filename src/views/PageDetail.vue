<template>
  <button @click="backToHome">
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

<style lang="scss" scoped>
  button {
    background-color: #07A88D;
    border: none;
    border-radius: 4.4rem;
    color: white;
    cursor: pointer;
    font-size: 1.6rem;
    height: 4.4rem;
    line-height: 4.4rem;
    margin-bottom: 2rem;
    text-align: center;
    width: 19.7rem;
}
</style>
