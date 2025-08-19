'use client'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'

export default function LoginPage() {
  const router = useRouter()
  const params = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // already logged in → bounce
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) router.replace('/post-login')
    })
  }, [router])

  const msg = params?.get('msg')

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    const uid = data.session?.user.id
    if (!uid) {
      router.replace('/post-login')
      return
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', uid)
      .maybeSingle()

    const role = profile?.role ?? 'member'
    router.replace(role === 'admin' ? '/admin' : '/member')
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <div className="card p-6">
        <h1 className="text-2xl font-bold text-white">Log in</h1>
        {msg && <p className="mt-2 text-sm text-brandOrange">{msg}</p>}
        {error && <p className="mt-2 text-sm text-red-400">{error}</p>}

        <form onSubmit={onLogin} className="mt-6 grid gap-3">
          <input className="input-dark" type="email" placeholder="Email"
                 value={email} onChange={e => setEmail(e.target.value)} required />
          <input className="input-dark" type="password" placeholder="Password"
                 value={password} onChange={e => setPassword(e.target.value)} required />
          <button className="btn-primary w-full" type="submit" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="mt-4 text-sm text-slate-400">
          New here? <Link href="/signup" className="text-brandOrange hover:underline">Create an account</Link>
        </p>
      </div>
    </div>
  )
}
