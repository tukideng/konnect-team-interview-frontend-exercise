import { vi, describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import ServiceCatalog from './ServiceCatalog.vue'
import servicesData from '../../mocks/services'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Mock the axios module for fetching API services
const mockedResponses = new Map().set(
  '/api/services',
  vi.fn(() => ({
    data: servicesData,
  })),
)

vi.mock('axios', async () => {
  const actual: any = await vi.importActual('axios')
  return {
    default: {
      ...actual.default,
      // Mock get request responses
      get: (url: string) =>
        vi
          .fn()
          .mockResolvedValue(
            mockedResponses.get(url) !== undefined
              ? mockedResponses.get(url)()
              : undefined,
          )(),
    },
  }
})

// Example component test for ServiceCatalog.vue
describe('ServiceCatalog', () => {
  let wrapper: any

  beforeEach(() => {
    mockedResponses.get('/api/services').mockReturnValue({
      data: [],
    })
    const app = createApp(ServiceCatalog)
    app.use(createPinia())
    wrapper = mount(ServiceCatalog)
  })

  it('shows the search input', async () => {
    // No `mockedResponses` modification needed; just use the default mocked response
    expect(wrapper.findTestId('search-input').isVisible()).toBe(true)
  })

  it('properly handles no services returned from the API', async () => {
    // Provide a custom `mockedResponses` response payload instead of using the default mocked response
    expect(wrapper.findTestId('no-results').isVisible()).toBe(true)
  })
})
