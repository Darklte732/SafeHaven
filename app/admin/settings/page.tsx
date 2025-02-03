'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import DashboardLayout from '@/components/admin/DashboardLayout'
import { toast } from 'react-hot-toast'
import { Switch } from '@headlessui/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { ArrowLeftIcon, HomeIcon, SunIcon, BellIcon, UserCircleIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'
import type { AdminSettings, NotificationSettings, DashboardSettings, AIAgentSettings, VoiceSettings, SecuritySettings, CustomizationSettings } from '@/types/settings'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useTheme } from '@/context/ThemeContext'

interface Settings {
  notifications: {
    email: boolean
    desktop: boolean
    mobile: boolean
    sound: boolean
    criticalAlerts: boolean
    dailyDigest: boolean
    weeklyReport: boolean
  }
  dashboard: {
    autoRefresh: boolean
    refreshInterval: number
    darkMode: boolean
    compactView: boolean
    showGraphs: boolean
    defaultView: string
    cardLayout: string
  }
  ai_agents: {
    autoAssign: boolean
    maxConcurrentChats: number
    handoffThreshold: number
    responseDelay: number
    maxQueueSize: number
    priorityClients: string[]
  }
  voice: {
    autoRecord: boolean
    transcription: boolean
    sentimentAnalysis: boolean
    qualityMonitoring: boolean
    noiseReduction: boolean
    saveRecordings: boolean
    recordingRetentionDays: number
  }
  security: {
    twoFactorAuth: boolean
    sessionTimeout: number
    ipWhitelist: string[]
    loginAttempts: number
    passwordExpiry: number
  }
  customization: {
    primaryColor: string
    accentColor: string
    logo: string | null
    brandName: string
    timezone: string
    dateFormat: string
    timeFormat: string
  }
}

const defaultSettings: Settings = {
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

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [settings, setSettings] = useState<Settings>(defaultSettings)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [activeSection, setActiveSection] = useState('notifications')
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(false)

  // Ensure component is mounted before rendering
  useEffect(() => {
    setMounted(true)
  }, [])

  // Memoize sections configuration
  const sections = useMemo(() => [
    {
      id: 'appearance',
      name: 'Appearance',
      icon: SunIcon,
      description: 'Customize how the dashboard looks and feels',
      settings: [
        {
          id: 'theme',
          name: 'Dark Mode',
          description: 'Use dark theme for the dashboard',
          value: theme === 'dark',
          onChange: toggleTheme,
        },
      ],
    },
    {
      id: 'notifications',
      name: 'Notifications',
      icon: BellIcon,
      description: 'Manage how you receive notifications',
      settings: [
        {
          id: 'email',
          name: 'Email Notifications',
          description: 'Receive notifications via email',
          value: emailNotifications,
          onChange: setEmailNotifications,
        },
        {
          id: 'push',
          name: 'Push Notifications',
          description: 'Receive notifications on your device',
          value: pushNotifications,
          onChange: setPushNotifications,
        },
      ],
    },
  ], [theme, toggleTheme, emailNotifications, pushNotifications])

  const fetchSettings = useCallback(async () => {
    if (!mounted) return

    try {
      setIsLoading(true)
      const response = await fetch('/api/admin/settings')
      
      if (!response.ok) {
        if (response.status === 404) {
          await saveSettings(defaultSettings)
          setSettings(defaultSettings)
          return
        }
        throw new Error('Failed to fetch settings')
      }

      const data = await response.json()
      setSettings(data)
    } catch (error) {
      console.error('Error fetching settings:', error)
      toast.error('Failed to load settings')
    } finally {
      setIsLoading(false)
    }
  }, [mounted])

  const saveSettings = useCallback(async (newSettings: Settings) => {
    if (!mounted) return

    try {
      setIsSaving(true)
      const response = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSettings),
      })

      if (!response.ok) {
        throw new Error('Failed to save settings')
      }

      toast.success('Settings saved successfully')
      router.refresh()
    } catch (error) {
      console.error('Error saving settings:', error)
      toast.error('Failed to save settings')
    } finally {
      setIsSaving(false)
    }
  }, [router, mounted])

  useEffect(() => {
    if (mounted) {
      fetchSettings()
    }
  }, [fetchSettings, mounted])

  const handleToggle = useCallback((section: string, key: string) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof Settings],
        [key]: !prev[section as keyof Settings][key as keyof typeof prev[keyof Settings]]
      }
    }))
  }, [])

  const handleInputChange = useCallback((section: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof Settings],
        [key]: value
      }
    }))
  }, [])

  const handleSave = useCallback(async () => {
    await saveSettings(settings)
  }, [settings, saveSettings])

  const handleBackToHome = useCallback(() => {
    router.push('/admin')
  }, [router])

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {sections.map((section) => (
            <div key={section.id} className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center">
                  <section.icon
                    className="h-6 w-6 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                  />
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {section.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {section.description}
                    </p>
              </div>
                </div>

                <div className="mt-6">
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {section.settings.map((setting) => (
                      <div
                        key={setting.id}
                        className="flex items-center justify-between py-4"
                      >
                        <div className="flex flex-col">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {setting.name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {setting.description}
                          </p>
                        </div>
                        <div className="w-64">
                          <Switch
                            checked={setting.value}
                            onChange={setting.onChange}
                            className={classNames(
                              setting.value ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700',
                              'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                            )}
                          >
                  <span
                              className={classNames(
                                setting.value ? 'translate-x-5' : 'translate-x-0',
                                'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                              )}
                            >
                  <span
                                className={classNames(
                                  setting.value
                                    ? 'opacity-0 duration-100 ease-out'
                                    : 'opacity-100 duration-200 ease-in',
                                  'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
                                )}
                                aria-hidden="true"
                              >
                                <svg
                                  className="h-3 w-3 text-gray-400"
                                  fill="none"
                                  viewBox="0 0 12 12"
                                >
                                  <path
                                    d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </span>
                              <span
                                className={classNames(
                                  setting.value
                                    ? 'opacity-100 duration-200 ease-in'
                                    : 'opacity-0 duration-100 ease-out',
                                  'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
                                )}
                                aria-hidden="true"
                              >
                                <svg
                                  className="h-3 w-3 text-blue-600"
                                  fill="currentColor"
                                  viewBox="0 0 12 12"
                                >
                                  <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                                </svg>
                              </span>
                            </span>
                          </Switch>
              </div>
            </div>
                    ))}
          </div>
                </div>
              </div>
            </div>
          ))}
          </div>
      </div>
    </DashboardLayout>
  )
} 