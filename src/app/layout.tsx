import { ReactNode } from 'react'
import './globals.css'
import { Inter } from 'next/font/google'
import { PocketProvider } from '@/pb'
import { AuthProvider } from '@/auth'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Pocketbase Authentication Test',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html data-theme="emerald" lang="en">
      <body className={`${inter.className} w-screen h-screen bg-base-200`}>
        <main className="w-screen h-screen">
          <PocketProvider>
            <AuthProvider>{children}</AuthProvider>
          </PocketProvider>
        </main>
      </body>
    </html>
  )
}
