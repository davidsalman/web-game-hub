'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const COOKIE_NAME = 'wgh_pages'
const MAX_AGE = 60 * 60 * 24 * 7 // 7 days

function getPageCount(): number {
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${COOKIE_NAME}=(\\d+)`))
  return match ? parseInt(match[1], 10) : 0
}

function incrementPageCount() {
  const current = getPageCount()
  document.cookie = `${COOKIE_NAME}=${current + 1}; path=/; max-age=${MAX_AGE}; SameSite=Lax`
}

export default function PageTracker() {
  const pathname = usePathname()

  useEffect(() => {
    // Increment on each new page visit (not the play page itself)
    if (!pathname.endsWith('/play')) {
      incrementPageCount()
    }
  }, [pathname])

  return null
}
