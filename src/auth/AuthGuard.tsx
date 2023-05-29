'use client'
import { useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'

import { useAuth } from './AuthProvider'

export function AuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    if (!user) {
      router.push('/')
    }
  }, [])

  if (!user) {
    return <h1>Carregando</h1>
  }

  if (user) {
    return <>{children}</>
  }

  return null
}
