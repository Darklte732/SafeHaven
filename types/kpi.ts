export interface KPIMetric {
  id: string
  name: string
  value: number
  change: number
  period: string
  created_at: string
}

export interface KPISummary {
  totalPolicies: number
  activeCustomers: number
  revenueGrowth: number
  customerSatisfaction: number
}

export interface TopPerformer {
  id: string
  name: string
  policies: number
  revenue: number
  sales?: number
}

export interface KPIDashboard {
  metrics: KPIMetric[]
  summary: KPISummary
  topPerformers: {
    agents: TopPerformer[]
    products: TopPerformer[]
  }
}

export interface KPIHistory {
  id: string
  metric_id: string
  value: number
  timestamp: string
} 