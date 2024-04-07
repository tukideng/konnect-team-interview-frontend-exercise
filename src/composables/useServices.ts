import { onBeforeMount, ref } from 'vue'
import axios from 'axios'
import type { ServiceDetail } from '@/types/service'

// This composable is a simplified example for the exercise **and could likely be improved**.
// Feel free to leave as-is, modify, or remove this file (and any others) as desired.
// https://vuejs.org/guide/reusability/composables.html

export default function useServices(query: string = '') {
  const services = ref<ServiceDetail[]>([])
  const loading = ref<boolean>(false)
  const error = ref<boolean>(false)

  const getServices = async (query: string = ''): Promise<any> => {
    try {
      // Initialize loading state
      loading.value = true

      // Fetch data from the API
      const url = `/api/services${query ? `?q=${query}` : ''}`
      const { data } = await axios.get(url)

      // Store data in Vue ref
      services.value = Array.isArray(data) ? data : []
    } catch (err: any) {
      error.value = true
    } finally {
      // Reset loading state
      loading.value = false
    }
  }

  onBeforeMount(async (): Promise<void> => {
    // Fetch services from the API
    await getServices(query)
  })

  // Return stateful data
  return {
    services,
    loading,
    error,
    getServices,
  }
}
