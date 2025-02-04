import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@/lib/supabase/server'
import type { AdminSettings } from '@/types/settings'

type SettingsKey = keyof AdminSettings

// Validation function for settings object
function validateSettings(settings: Partial<AdminSettings>): { valid: boolean; error?: string } {
  const requiredFields: SettingsKey[] = ['notifications', 'dashboard', 'ai_agents', 'voice', 'security', 'customization']
  const missingFields = requiredFields.filter(field => !settings[field])
  
  if (missingFields.length > 0) {
    return {
      valid: false,
      error: `Missing required fields: ${missingFields.join(', ')}`
    }
  }

  // Validate notifications
  if (typeof settings.notifications?.email !== 'boolean' ||
      typeof settings.notifications?.desktop !== 'boolean' ||
      typeof settings.notifications?.mobile !== 'boolean') {
    return {
      valid: false,
      error: 'Invalid notification settings'
    }
  }

  // Validate dashboard
  if (typeof settings.dashboard?.autoRefresh !== 'boolean' ||
      typeof settings.dashboard?.refreshInterval !== 'number' ||
      !['all', 'pending', 'approved', 'rejected'].includes(settings.dashboard?.defaultView || '')) {
    return {
      valid: false,
      error: 'Invalid dashboard settings'
    }
  }

  // Validate AI agents
  if (typeof settings.ai_agents?.maxConcurrentChats !== 'number' ||
      typeof settings.ai_agents?.handoffThreshold !== 'number' ||
      !Array.isArray(settings.ai_agents?.priorityClients)) {
    return {
      valid: false,
      error: 'Invalid AI agent settings'
    }
  }

  // Validate voice settings
  if (typeof settings.voice?.autoRecord !== 'boolean' ||
      typeof settings.voice?.transcription !== 'boolean' ||
      typeof settings.voice?.recordingRetentionDays !== 'number') {
    return {
      valid: false,
      error: 'Invalid voice settings'
    }
  }

  // Validate security settings
  if (typeof settings.security?.twoFactorAuth !== 'boolean' ||
      typeof settings.security?.sessionTimeout !== 'number' ||
      !Array.isArray(settings.security?.ipWhitelist)) {
    return {
      valid: false,
      error: 'Invalid security settings'
    }
  }

  // Validate customization
  if (typeof settings.customization?.primaryColor !== 'string' ||
      typeof settings.customization?.brandName !== 'string' ||
      !['12h', '24h'].includes(settings.customization?.timeFormat || '')) {
    return {
      valid: false,
      error: 'Invalid customization settings'
    }
  }

  return { valid: true }
}

export async function GET() {
  try {
    const supabase = createServerClient()
    const { data: settings, error } = await supabase
      .from('admin_settings')
      .select('*')
      .single()

    if (error) throw error

    return NextResponse.json(settings)
  } catch (error) {
    console.error('Error fetching settings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createServerClient()
    const settings = await request.json()

    const { error } = await supabase
      .from('admin_settings')
      .upsert(settings)

    if (error) throw error

    return NextResponse.json({ message: 'Settings updated successfully' })
  } catch (error) {
    console.error('Error updating settings:', error)
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    )
  }
} 