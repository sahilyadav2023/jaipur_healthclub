'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import Reveal from '@/components/Reveal'
import { UserHeader } from '@/components/UserHeader'

type Offer = {
  id: string
  title: string
  description?: string | null
  badge_text?: string | null
  discount_pct?: number | null
  starts_on: string
  ends_on: string
  is_active?: boolean | null
  priority?: number | null
  image_url?: string | null   // ✅ optional image field
}

export default function OffersPage() {
  const [offers, setOffers] = useState<Offer[]>([])
  const [loading, setLoading] = useState(true)
  const [preview, setPreview] = useState<string | null>(null) // ✅ modal image

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('offers')
        .select('*')
        .order('priority', { ascending: false })
        .order('ends_on', { ascending: true })

      if (error) {
        console.error('Offers load error:', error)
        setOffers([])
      } else {
        setOffers((data ?? []) as Offer[])
      }
      setLoading(false)
    }
    load()
  }, [])

  return (
    <div className="bg-[#0B0C10] min-h-screen">
      {/* Navbar */}
      <UserHeader />

      <div className="mx-auto max-w-6xl px-4 py-16">
        <h1 className="text-4xl font-extrabold text-center mb-12 text-white">
          Current <span className="text-brandOrange">Offers</span>
        </h1>

        {loading && <p className="text-center text-slate-400">Loading offers…</p>}
        {!loading && offers.length === 0 && (
          <p className="text-center text-slate-400">No active offers right now. Check back soon!</p>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {offers.map((o, i) => (
            <Reveal key={o.id} delay={i * 100}>
              <div className="relative card p-6 group hover:-translate-y-1 hover:shadow-xl transition">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-brandOrange/30 to-pinkJaipur/25 opacity-0 group-hover:opacity-100 transition pointer-events-none" />
                <div className="relative z-10 space-y-3">
                  {/* Title + badge */}
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-2xl font-semibold text-white">{o.title}</h2>
                    {o.badge_text && (
                      <span className="inline-flex items-center rounded-full bg-brandOrange/15 px-3 py-1 text-xs font-medium text-brandOrange">
                        {o.badge_text}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  {o.description && (
                    <div className="text-slate-300 leading-relaxed">
                      <span className="block text-slate-400 text-xs uppercase tracking-wide mb-1">Offer Description</span>
                      {o.description}
                    </div>
                  )}

                  {/* Dates */}
                  <div className="text-slate-300">
                    <span className="block text-slate-400 text-xs uppercase tracking-wide mb-1">Valid Dates</span>
                    {new Date(o.starts_on).toLocaleDateString()} – {new Date(o.ends_on).toLocaleDateString()}
                  </div>

                  {/* Discount */}
                  {o.discount_pct != null && (
                    <div className="text-slate-300">
                      <span className="block text-slate-400 text-xs uppercase tracking-wide mb-1">Discount</span>
                      <span className="text-brandOrange font-semibold">{o.discount_pct}% OFF</span>
                    </div>
                  )}

                  {/* Picture Button */}
                  {o.image_url && (
                    <div className="pt-2">
                      <button
                        className="btn-ghost"
                        onClick={() => setPreview(o.image_url!)}
                      >
                        View Picture
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Image Preview Modal */}
      {preview && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
          onClick={() => setPreview(null)}
        >
          <div
            className="bg-brandCard rounded-2xl border border-brandStroke p-3 max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end">
              <button className="btn-ghost" onClick={() => setPreview(null)}>Close</button>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt="Offer"
              className="w-full h-auto rounded-xl"
            />
          </div>
        </div>
      )}
    </div>
  )
}
