'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import AdminGuard from '@/components/AdminGuard'

type OfferForm = {
  title: string
  description?: string
  badge_text?: string
  discount_pct?: number
  starts_on: string
  ends_on: string
  priority?: number
  is_active?: boolean
  image_url?: string
}

type OfferRow = OfferForm & { id: string }

export default function AdminOffers() {
  const [list, setList] = useState<OfferRow[]>([])
  const [form, setForm] = useState<OfferForm>({
    title: '',
    description: '',
    badge_text: 'Hot',
    discount_pct: 20,
    starts_on: '',
    ends_on: '',
    priority: 10,
    is_active: true,
    image_url: ''
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const load = async () => {
    const { data } = await supabase.from('offers').select('*')
    setList((data || []) as OfferRow[])
  }
  useEffect(() => { load() }, [])

  const save = async () => {
    if (!form.title || !form.starts_on || !form.ends_on) {
      setError('Please fill required fields.')
      return
    }
    setSaving(true)
    try {
      await supabase.from('offers').insert(form)
      setForm({
        title: '',
        description: '',
        badge_text: 'Hot',
        discount_pct: 20,
        starts_on: '',
        ends_on: '',
        priority: 10,
        is_active: true,
        image_url: ''
      })
      await load()
    } catch (e) {
      if (e instanceof Error) setError(e.message)
      else setError('Failed to save offer.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <AdminGuard>
      <div className="p-6">
        <h1 className="text-2xl text-white mb-4">Admin Offers</h1>
        <div className="grid gap-3 md:grid-cols-3">
          <input className="input-dark md:col-span-3" placeholder="Title"
            value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
          <input className="input-dark md:col-span-3" placeholder="Description"
            value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
          <input className="input-dark" placeholder="Badge"
            value={form.badge_text} onChange={e => setForm({ ...form, badge_text: e.target.value })} />
          <input type="number" className="input-dark" placeholder="Discount %"
            value={form.discount_pct} onChange={e => setForm({ ...form, discount_pct: Number(e.target.value) })} />
          <input type="date" className="input-dark" value={form.starts_on}
            onChange={e => setForm({ ...form, starts_on: e.target.value })} />
          <input type="date" className="input-dark" value={form.ends_on}
            onChange={e => setForm({ ...form, ends_on: e.target.value })} />
          <input type="number" className="input-dark" placeholder="Priority"
            value={form.priority} onChange={e => setForm({ ...form, priority: Number(e.target.value) })} />
          <button className="btn-primary" disabled={saving} onClick={save}>
            {saving ? 'Saving…' : 'Add Offer'}
          </button>
        </div>
        <div className="mt-6 space-y-2">
          {list.map(o => (
            <div key={o.id} className="card p-3">
              <p className="text-white font-medium">{o.title}</p>
              <p className="text-slate-400 text-sm">{o.starts_on} → {o.ends_on}</p>
            </div>
          ))}
        </div>
      </div>
    </AdminGuard>
  )
}
