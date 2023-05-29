'use client'
import { FormEventHandler, useCallback, useState } from 'react'
import Link from 'next/link'
import { cx } from 'classix'
import { useRouter } from 'next/navigation'

import { useAuth } from '@/auth'
import { FormControl } from '@/core/components'

export default function Home() {
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setLoading] = useState(false)

  const handleLogin = useCallback(async () => {
    console.log({ email, password })
    setLoading(true)
    try {
      await login(email, password)
      router.push('/system')
    } catch (e) {
      setLoading(false)
      console.error(e)
    }
  }, [password, email, login])

  return (
    <div className="container h-screen mx-auto flex">
      <div className="grid gap-4 place-content-center m-auto max-w-xl w-full">
        <div className="card bg-base-100 shadow-xl w-full">
          <div className="card-body w-full">
            <h1 className="card-title">Login</h1>
            <div className="grid gap-3">
              <FormControl label="E-mail">
                <input
                  type="text"
                  className="input input-bordered w-full"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </FormControl>
              <FormControl label="Password">
                <input
                  type="password"
                  className="input input-bordered w-full"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </FormControl>
            </div>
            <div className="card-actions mt-6">
              <button onClick={handleLogin} className={cx('btn btn-primary w-full', isLoading && 'loading')}>
                Sign in
              </button>
            </div>
            <div className="flex justify-end">
              <Link className="link" href="/register">
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
