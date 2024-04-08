<template>
  <header>
    <div class="nav">
      <router-link to="/">
        <img alt="logo" src="/assets/logo.svg">
      </router-link>
      <div class="links">
        <router-link to="/">
          <i class="bi bi-people-fill " />
          <span v-if="!isMobile">Organization</span>
        </router-link>
        <router-link to="/">
          <i class="bi bi-gear-fill" />
          <span v-if="!isMobile">Settings</span>
        </router-link>
        <router-link to="/">
          <i class="bi bi-person-fill" />
          <span v-if="!isMobile">User Name</span>
        </router-link>
      </div>
    </div>
  </header>
  <main>
    <router-view />
  </main>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from 'vue'
import { debounce } from 'lodash'

export default defineComponent({
  name: 'App',
  setup() {
    const isMobile = ref(window.innerWidth <= 768)

    const handleResize = () => {
      isMobile.value = window.innerWidth <= 768
    }

    const debouncedUpdateWidth = debounce(handleResize, 200)

    onMounted(() => {
      window.addEventListener('resize', debouncedUpdateWidth)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', debouncedUpdateWidth)
    })

    return {
      isMobile,
    }
  },
})
</script>

<style lang="scss" scoped>
header {
  position: sticky;
  top: 0;
  z-index: 20;
}

.nav {
  background: linear-gradient(180deg, #09224F 0%, #073382 100%);
  display: flex;
  height: 7rem;
  justify-content: space-between;
  line-height: 7rem;

  .links {
    display: flex;
    gap: 1.6rem;
  }

  a {
    text-decoration: none;

    i {
      color: white;
      font-size: 2rem;
    }

    &:last-child {
      background-color: #072863;
      padding: 0 2rem;
    }
  }

  span {
    color: white;
    font-size: 1.5rem;
    font-weight: 600;
    margin-left: .8rem;
  }
}

main {
  color: var(--main-text-color);
  margin: 2rem auto;
  max-width: 1366px;
  padding: 0 20px;
}
</style>

<style lang="scss">
// Unscoped styles for html and body
html {
  font-size: 10px;
  margin: 0;
  padding: 0;
}

body {
  background-color: #F8F8FA;
  font-family: Arial, sans-serif;
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 1.2;
  margin: 0 auto;
}

p {
    margin: 0;
}
</style>
