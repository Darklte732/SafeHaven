import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

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

export async function GET(request: NextRequest) {
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    return NextResponse.json(defaultSettings)
  } catch (error) {
    console.error('Error fetching settings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const settings = await request.json()
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    return NextResponse.json({ message: 'Settings updated successfully' })
  } catch (error) {
    console.error('Error updating settings:', error)
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    )
  }
} 