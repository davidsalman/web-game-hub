'use client'

import { useEffect, useRef } from 'react'

interface AdBannerProps {
  slot: string
  format?: 'auto' | 'horizontal' | 'rectangle' | 'vertical'
  className?: string
}

declare global {
  interface Window {
    adsbygoogle: unknown[]
  }
}

export default function AdBanner({ slot, format = 'auto', className = '' }: AdBannerProps) {
  const adRef = useRef<HTMLModElement>(null)
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT

  useEffect(() => {
    if (!clientId || clientId === 'ca-pub-your_id') return
    try {
      if (adRef.current && !adRef.current.getAttribute('data-adsbygoogle-status')) {
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      }
    } catch {
      // AdSense not available
    }
  }, [clientId])

  if (!clientId || clientId === 'ca-pub-your_id') {
    return (
      <div className={`bg-gray-900 border border-dashed border-gray-700 rounded-lg flex items-center justify-center text-gray-600 text-sm ${className}`}
        style={{ minHeight: 90 }}>
        Advertisement
      </div>
    )
  }

  return (
    <div className={className}>
      <ins
        ref={adRef}
        className="adsbygoogle block"
        data-ad-client={clientId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  )
}
