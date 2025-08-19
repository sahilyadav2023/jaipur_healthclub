'use client'
import MemberGuard from '@/components/MemberGuard'
import Link from 'next/link'

export default function MemberHome() {
  return (
    <MemberGuard>
      <div className="mx-auto max-w-5xl px-4 py-12">
        <h1 className="text-3xl font-extrabold text-white">Welcome 👋</h1>
        <p className="mt-2 text-slate-400">Explore classes, trainers, and current offers.</p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          <Link href="/classes" className="card p-6 hover:-translate-y-[2px] hover:shadow-lg transition">
            <p className="text-sm text-slate-400">See</p>
            <p className="text-2xl font-bold text-white">Classes</p>
          </Link>
          <Link href="/trainers" className="card p-6 hover:-translate-y-[2px] hover:shadow-lg transition">
            <p className="text-sm text-slate-400">Meet</p>
            <p className="text-2xl font-bold text-white">Trainers</p>
          </Link>
          <Link href="/offers" className="card p-6 hover:-translate-y-[2px] hover:shadow-lg transition">
            <p className="text-sm text-slate-400">Grab</p>
            <p className="text-2xl font-bold text-white">Offers</p>
          </Link>
        </div>
      </div>
    </MemberGuard>
  )
}
