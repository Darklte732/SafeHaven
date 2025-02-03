export interface NotificationSettings {
  email: boolean
  desktop: boolean
  mobile: boolean
  sound: boolean
  criticalAlerts: boolean
  dailyDigest: boolean
  weeklyReport: boolean
}

export interface DashboardSettings {
  autoRefresh: boolean
  refreshInterval: number
  darkMode: boolean
  compactView: boolean
  showGraphs: boolean
  defaultView: string
  cardLayout: string
}

export interface AIAgentSettings {
  autoAssign: boolean
  maxConcurrentChats: number
  handoffThreshold: number
  responseDelay: number
  maxQueueSize: number
  priorityClients: string[]
}

export interface VoiceSettings {
  autoRecord: boolean
  transcription: boolean
  sentimentAnalysis: boolean
  qualityMonitoring: boolean
  noiseReduction: boolean
  saveRecordings: boolean
  recordingRetentionDays: number
}

export interface SecuritySettings {
  twoFactorAuth: boolean
  sessionTimeout: number
  ipWhitelist: string[]
  loginAttempts: number
  passwordExpiry: number
}

export interface CustomizationSettings {
  primaryColor: string
  accentColor: string
  logo: string | null
  brandName: string
  timezone: string
  dateFormat: string
  timeFormat: string
}

export interface AdminSettings {
  notifications: NotificationSettings
  dashboard: DashboardSettings
  ai_agents: AIAgentSettings
  voice: VoiceSettings
  security: SecuritySettings
  customization: CustomizationSettings
}

export interface AdminLog {
  id: string
  action: string
  details: any
  admin_id: string
  created_at: string
} 