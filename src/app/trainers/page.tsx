'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { supabase } from '@/lib/supabaseClient'
import { Section } from '@/components/Section'
import { UserHeader } from '@/components/UserHeader'   // ✅ added

type Trainer = {
  id: string
  name: string
  role: string
  bio_short?: string | null
  bio_long?: string | null
  specialties?: string[] | null
  photo_url?: string | null
  is_active?: boolean | null
}

export default function TrainersPage() {
  const [list, setList] = useState<Trainer[]>([])
  const [selected, setSelected] = useState<Trainer | null>(null)

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from('trainers')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
      setList((data ?? []) as Trainer[])
    }
    load()
  }, [])

  return (
    <div className="bg-[#0B0C10] min-h-screen">
      {/* ✅ Navbar */}
      <UserHeader />

      <div className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="text-3xl font-extrabold text-center mb-10 text-white">
          Meet Our <span className="text-pinkJaipur">Trainers</span>
        </h1>

        {/* Trainer Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {list.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelected(t)}
              className="group rounded-2xl border bg-white shadow hover:shadow-lg transition overflow-hidden text-left"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                {t.photo_url ? (
                  <Image
                    src={t.photo_url}
                    alt={t.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="h-full w-full bg-slate-100 flex items-center justify-center text-slate-400">
                    No photo
                  </div>
                )}
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold">{t.name}</h2>
                <p className="text-sm text-slate-600">{t.role}</p>
                {t.bio_short && <p className="mt-2 text-xs text-slate-500 line-clamp-2">{t.bio_short}</p>}
              </div>
            </button>
          ))}
        </div>

        {/* Modal for full trainer info */}
        {selected && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
            onClick={() => setSelected(null)}
          >
            <div
              className="relative max-w-lg w-full rounded-2xl bg-white shadow-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                className="absolute top-3 right-3 rounded-full bg-slate-200 p-2 hover:bg-slate-300 transition"
                onClick={() => setSelected(null)}
              >
                ✕
              </button>

              {selected.photo_url && (
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={selected.photo_url}
                    alt={selected.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <div className="p-6">
                <h2 className="text-2xl font-bold">{selected.name}</h2>
                <p className="text-sm text-slate-600 mb-3">{selected.role}</p>

                {selected.specialties?.length ? (
                  <div className="mb-3 flex flex-wrap gap-2">
                    {selected.specialties.map((s) => (
                      <span
                        key={s}
                        className="inline-flex items-center rounded-full bg-warmOrange/20 px-3 py-1 text-xs font-medium text-orange-700"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                ) : null}

                {selected.bio_long ? (
                  <p className="text-slate-700 whitespace-pre-line">{selected.bio_long}</p>
                ) : (
                  <p className="text-slate-500">{selected.bio_short}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
