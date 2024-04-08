type ServiceType = 'HTTP' | 'REST'

interface ServiceDeveloper {
  name: string
  email: string
  id: string
  avatar: string
}

interface ServiceVersion {
  name: string
  id: string
  description: string
  updated_at: string
  developer: ServiceDeveloper
}

interface ServiceMetric {
  errors: number
  uptime: number
  latency: number
  requests: number
}

interface ServiceDetail {
  name: string
  description: string
  id: string
  configured: boolean
  published: boolean
  type: ServiceType
  versions: ServiceVersion[]
  metrics: ServiceMetric
}

export type {
  ServiceType,
  ServiceDeveloper,
  ServiceVersion,
  ServiceMetric,
  ServiceDetail,
}
