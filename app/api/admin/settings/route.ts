import { NextResponse } from 'next/server'

const defaultSettings = {
  notifications: {
    email: true,
    desktop: false,
    mobile: true,
    sound: true,
    criticalAlerts: true,
    dailyDigest: true,
    weeklyReport: true
  },
  dashboard: {
    autoRefresh: true,
    refreshInterval: 5,
    darkMode: true,
    compactView: false,
    showGraphs: true,
    defaultView: 'all',
    cardLayout: 'grid'
  },
  ai_agents: {
    autoAssign: true,
    maxConcurrentChats: 5,
    handoffThreshold: 80,
    responseDelay: 1000,
    maxQueueSize: 10,
    priorityClients: []
  },
  voice: {
    autoRecord: true,
    transcription: true,
    sentimentAnalysis: true,
    qualityMonitoring: true,
    noiseReduction: true,
    saveRecordings: true,
    recordingRetentionDays: 30
  },
  security: {
    twoFactorAuth: false,
    sessionTimeout: 30,
    ipWhitelist: [],
    loginAttempts: 5,
    passwordExpiry: 90
  },
  customization: {
    primaryColor: '#1D4ED8',
    accentColor: '#3B82F6',
    logo: null,
    brandName: 'SafeHaven Insurance',
    timezone: 'America/New_York',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h'
  }
}

export const runtime = 'nodejs'

export async function GET() {
  return NextResponse.json(defaultSettings);
}

export async function POST(request: Request) {
  const data = await request.json();
  return NextResponse.json({ message: 'Settings updated successfully', data });
} 