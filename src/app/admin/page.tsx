'use client'
import AdminGuard from '@/components/AdminGuard'
import Link from 'next/link'

export default function AdminPage() {
  const Tile = ({ href, title, sub }: { href: string; title: string; sub: string }) => (
    <Link
      href={href}
      className="card p-6 hover:-translate-y-[2px] hover:shadow-lg transition group"
    >
      <p className="text-sm text-slate-400">{sub}</p>
      <p className="mt-1 text-2xl font-bold text-white group-hover:text-brandOrange transition">{title}</p>
    </Link>
  )
  return (
    <AdminGuard>
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="text-3xl font-extrabold text-white">Admin <span className="text-brandOrange">Dashboard</span></h1>
        <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Tile href="/admin/offers" title="Offers" sub="Manage" />
          <Tile href="/admin/trainers" title="Trainers" sub="Manage" />
          <Tile href="/admin/classes" title="Classes" sub="Manage" />
          <Tile href="/admin/sessions" title="Sessions" sub="Timetable" />
  
          
        </div>
      </div>
    </AdminGuard>
  )
}
