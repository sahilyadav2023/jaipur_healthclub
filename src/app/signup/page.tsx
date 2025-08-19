'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function PostLoginRouter() {
  const router = useRouter()

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.replace('/login?msg=Please%20login')
        return
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .maybeSingle()

      const role = profile?.role ?? 'member'
      router.replace(role === 'admin' ? '/admin' : '/member')
    })()
  }, [router])

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <div className="card p-6">
        <p className="text-slate-300">Checking your account…</p>
      </div>
    </div>
  )
}
