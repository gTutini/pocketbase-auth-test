'use client'
import { createContext, useCallback, useState, useEffect, ReactNode, useContext } from 'react'
import { useInterval } from 'usehooks-ts'
import jwtDecode from 'jwt-decode'
import { Admin, Record, RecordAuthResponse } from 'pocketbase'

import { usePocket } from '@/pb'

const fiveMinutesInMs = 300000
const twoMinutesInMs = 120000

interface Auth {
  register: (email: string, password: string) => Promise<Record>
  login: (email: string, password: string) => Promise<RecordAuthResponse<Record>>
  logout: () => void
  user: Record | Admin | null
  token: string
}

const AuthContext = createContext<Auth | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const pb = usePocket()
  const [token, setToken] = useState(pb.authStore.token)
  const [user, setUser] = useState(pb.authStore.model)

  useEffect(() => {
    return pb.authStore.onChange((token, model) => {
      setToken(token)
      setUser(model)
    })
  }, [pb.authStore])

  const register = useCallback(
    async (email: string, password: string) => {
      return await pb.collection('users').create({ email, password, passwordConfirm: password })
    },
    [pb]
  )

  const login = useCallback(
    async (email: string, password: string) => {
      return await pb.collection('users').authWithPassword(email, password)
    },
    [pb]
  )

  const logout = useCallback(() => {
    pb.authStore.clear()
  }, [pb.authStore])

  const refreshSession = useCallback(async () => {
    if (!pb.authStore.isValid) return
    const decoded: { exp: number } = jwtDecode(token)
    const tokenExpiration = decoded.exp
    const expirationWithBuffer = (decoded.exp + fiveMinutesInMs) / 1000
    if (tokenExpiration < expirationWithBuffer) {
      await pb.collection('users').authRefresh()
    }
  }, [pb, token])

  useInterval(refreshSession, token ? twoMinutesInMs : null)

  return <AuthContext.Provider value={{ register, login, logout, user, token }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const authContext = useContext(AuthContext)

  if (!authContext) {
    throw new Error('useCurrentUser has to be used within <CurrentUserContext.Provider>')
  }

  return authContext
}
