'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export const AdminHeader = () => {
  const router = useRouter()

  const signOut = async () => {
    await supabase.auth.signOut()
    router.replace('/login?msg=Signed%20out')
  }

  const Nav = (href: string, label: string) => (
    <Link
      href={href}
      className="px-3 py-2 rounded-lg transition text-slate-300 hover:text-white hover:bg-white/5"
    >
      {label}
    </Link>
  )

  return (
    <header className="sticky top-0 z-50 border-b border-brandStroke/80 bg-[#0B0C10]/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 flex h-16 items-center justify-between">
        <Link href="/admin" className="text-lg font-bold text-white">
          Admin <span className="text-brandOrange">Dashboard</span>
        </Link>

        <nav className="flex items-center gap-1">
          {Nav('/admin/offers', 'Offers')}
          {Nav('/admin/trainers', 'Trainers')}
          {Nav('/admin/classes', 'Classes')}
          {Nav('/admin/sessions', 'Sessions')}
          {Nav('/admin/testimonials', 'Testimonials')}
          {Nav('/admin/leads', 'Leads')}
        </nav>

        <button onClick={signOut} className="btn-ghost">Sign out</button>
      </div>
    </header>
  )
}
