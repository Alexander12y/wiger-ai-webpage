'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

// ---------------------------------------------------------------------------
// Lightweight analytics tracker — fires page views and events to our API.
// All writes are fire-and-forget (POST + ignore response).
// ---------------------------------------------------------------------------

function getDeviceType(): 'desktop' | 'mobile' | 'tablet' {
  const ua = navigator.userAgent
  if (/tablet|ipad|playbook|silk/i.test(ua)) return 'tablet'
  if (/mobile|android|iphone|ipod|blackberry|iemobile|opera mini/i.test(ua)) return 'mobile'
  return 'desktop'
}

function getBrowser(): string {
  const ua = navigator.userAgent
  if (ua.includes('Edg')) return 'Edge'
  if (ua.includes('Chrome')) return 'Chrome'
  if (ua.includes('Firefox')) return 'Firefox'
  if (ua.includes('Safari')) return 'Safari'
  return 'Other'
}

function getOs(): string {
  const ua = navigator.userAgent
  if (ua.includes('Windows')) return 'Windows'
  if (ua.includes('Mac')) return 'macOS'
  if (ua.includes('Linux')) return 'Linux'
  if (ua.includes('Android')) return 'Android'
  if (ua.includes('iPhone') || ua.includes('iPad')) return 'iOS'
  return 'Other'
}

function getUtmParams() {
  if (typeof window === 'undefined') return {}
  const sp = new URLSearchParams(window.location.search)
  return {
    utmSource:   sp.get('utm_source') ?? undefined,
    utmMedium:   sp.get('utm_medium') ?? undefined,
    utmCampaign: sp.get('utm_campaign') ?? undefined,
  }
}

const SESSION_KEY = 'wiger-analytics-session'

async function ensureSession(): Promise<string> {
  const existing = sessionStorage.getItem(SESSION_KEY)
  if (existing) return existing

  try {
    const res = await fetch('/api/analytics/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'create',
        userAgent: navigator.userAgent,
        device: getDeviceType(),
        os: getOs(),
        browser: getBrowser(),
      }),
    })
    if (res.ok) {
      const data = await res.json()
      const sid = data.sessionId as string
      sessionStorage.setItem(SESSION_KEY, sid)
      return sid
    }
  } catch {
    // ignore — analytics is non-critical
  }
  return 'unknown'
}

function trackPageView(path: string, sessionId: string) {
  const utms = getUtmParams()
  fetch('/api/analytics/pageview', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      path,
      referrer: document.referrer || undefined,
      sessionId,
      ...utms,
    }),
  }).catch(() => null)
}

export function trackEvent(
  eventType: string,
  label?: string,
  metadata?: Record<string, unknown>
) {
  const sessionId = sessionStorage.getItem(SESSION_KEY)
  if (!sessionId) return

  fetch('/api/analytics/event', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sessionId,
      eventType,
      path: window.location.pathname,
      label,
      metadata,
    }),
  }).catch(() => null)
}

export default function AnalyticsTracker() {
  const pathname = usePathname()
  const sessionIdRef = useRef<string | null>(null)
  const startRef = useRef<number>(Date.now())
  const pageCountRef = useRef<number>(0)

  // Initialize session once
  useEffect(() => {
    ensureSession().then((sid) => {
      sessionIdRef.current = sid
    })

    // Update session duration on unload
    const handleUnload = () => {
      const sid = sessionIdRef.current
      if (!sid || sid === 'unknown') return
      const durationSec = Math.round((Date.now() - startRef.current) / 1000)
      navigator.sendBeacon(
        '/api/analytics/session',
        JSON.stringify({ action: 'update', sessionId: sid, durationSec, ended: true })
      )
    }
    window.addEventListener('beforeunload', handleUnload)
    return () => window.removeEventListener('beforeunload', handleUnload)
  }, [])

  // Track page views on route change
  useEffect(() => {
    if (!sessionIdRef.current) {
      // Session not ready yet — wait a tick
      const t = setTimeout(() => {
        if (sessionIdRef.current) {
          pageCountRef.current += 1
          trackPageView(pathname, sessionIdRef.current)
          fetch('/api/analytics/session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              action: 'update',
              sessionId: sessionIdRef.current,
              pageCount: pageCountRef.current,
            }),
          }).catch(() => null)
        }
      }, 500)
      return () => clearTimeout(t)
    }

    pageCountRef.current += 1
    trackPageView(pathname, sessionIdRef.current)
    fetch('/api/analytics/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'update',
        sessionId: sessionIdRef.current,
        pageCount: pageCountRef.current,
      }),
    }).catch(() => null)
  }, [pathname])

  return null
}
