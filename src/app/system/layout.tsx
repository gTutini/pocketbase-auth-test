import { ReactNode } from 'react'
import { AuthGuard } from '@/auth'

export const metadata = {
  title: 'Protected Route',
}

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>
}
