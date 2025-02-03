type EventType = 'page_view' | 'quote_start' | 'quote_complete' | 'contact_form' | 'exit_intent'

interface AnalyticsEvent {
  type: EventType
  properties?: Record<string, any>
}

export const trackEvent = (event: AnalyticsEvent) => {
  // Google Analytics
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('event', event.type, event.properties)
  }

  // You can add more analytics providers here
  // For example: Mixpanel, Segment, etc.

  // Log events in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Analytics Event:', event)
  }
}

export const pageView = (url: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
      page_path: url,
    })
  }
} 