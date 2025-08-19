'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { useEffect, useState } from 'react'
import type { Session } from '@supabase/supabase-js'

export const UserHeader = () => {
  const router = useRouter()
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: listener } = supabase.auth.onAuthStateChange((_e, sess) => setSession(sess))
    return () => { listener.subscription.unsubscribe() }
  }, [])

  const signOut = async () => {
    await supabase.auth.signOut()
    router.replace('/home')
  }

  const Nav = (href: string, label: string) => (
    <Link href={href}
      className="px-3 py-2 rounded-lg transition text-slate-300 hover:text-white hover:bg-white/5">
      {label}
    </Link>
  )

  return (
    <header className="sticky top-0 z-50 border-b border-brandStroke/80 bg-[#0B0C10]/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 flex h-16 items-center justify-between">
        <Link href="/home" className="text-lg font-bold text-white">
          Jaipur <span className="text-brandOrange">Health</span> Club
        </Link>
        <nav className="flex items-center gap-1">
          {Nav('/home', 'Home')}
          {Nav('/classes', 'Classes')}
          {Nav('/offers', 'Offers')}
          {Nav('/pricing', 'Pricing')}
          {Nav('/contact', 'Contact')}
        </nav>
        <div className="flex items-center gap-2">
          {!session ? (
            <Link href="/login" className="btn-primary">Login</Link>
          ) : (
            <button onClick={signOut} className="btn-ghost">Sign out</button>
          )}
        </div>
      </div>
    </header>
  )
}
