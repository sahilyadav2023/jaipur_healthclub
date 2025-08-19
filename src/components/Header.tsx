'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import clsx from 'clsx'
import { supabase } from '@/lib/supabaseClient'
import { useEffect, useState } from 'react'

export const Header = () => {
  const path = usePathname()
  const router = useRouter()
  const [role, setRole] = useState<string | null>(null)

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        setRole(null)
        return
      }
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .maybeSingle()
      setRole(profile?.role ?? 'member')
    })()
  }, [])

  const Nav = (href: string, label: string) => (
    <Link
      href={href}
      className={clsx(
        'px-3 py-2 rounded-lg transition',
        'text-slate-300 hover:text-white hover:bg-white/5',
        path === href && 'text-white bg-white/10'
      )}
    >
      {label}
    </Link>
  )

  const signOut = async () => {
    await supabase.auth.signOut()
    router.replace('/login?msg=Signed%20out')
  }

  return (
    <header className="sticky top-0 z-50 border-b border-brandStroke/80 bg-[#0B0C10]/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 flex h-16 items-center justify-between">
        <Link href="/" className="text-lg font-bold text-white">
          Jaipur <span className="text-brandOrange">Health</span> Club
        </Link>

        <nav className="flex items-center gap-1">
          {Nav('/', 'Home')}
          {Nav('/classes', 'Classes')}
          {Nav('/trainers', 'Trainers')}
          {Nav('/offers', 'Offers')}
          {Nav('/contact', 'Contact')}
          {role === 'admin' && Nav('/admin', 'Admin')}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/contact" className="hidden sm:inline-flex btn-primary">Join Now</Link>
          <button onClick={signOut} className="btn-ghost">Sign out</button>
        </div>
      </div>
    </header>
  )
}
