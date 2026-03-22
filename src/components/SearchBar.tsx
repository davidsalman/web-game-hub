'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X } from 'lucide-react'

interface SearchBarProps {
  onClose?: () => void
  placeholder?: string
  disabled?: boolean
  fullWidth?: boolean
}

export default function SearchBar({ onClose, placeholder = 'Search games...', disabled = false, fullWidth = false }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) return
    router.push(`/browse?q=${encodeURIComponent(trimmed)}`)
    onClose?.()
  }, [query, router, onClose])

  return (
    <form onSubmit={handleSubmit} className={`relative flex items-center ${fullWidth ? 'w-full' : ''}`}>
      <Search size={18} className="absolute left-3 text-gray-500 pointer-events-none" />
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder={placeholder}
        autoFocus
        disabled={disabled}
        className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-10 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500 transition-colors disabled:cursor-not-allowed disabled:opacity-60"
      />
      {query && (
        <button
          type="button"
          onClick={() => setQuery('')}
          className="absolute right-3 text-gray-500 hover:text-white transition-colors"
        >
          <X size={16} />
        </button>
      )}
    </form>
  )
}
