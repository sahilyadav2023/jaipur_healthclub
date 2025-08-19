'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import AdminGuard from '@/components/AdminGuard'

type TrainerForm = {
  name: string
  role: string
  bio_short: string
  specialties: string
  photo_url?: string
}

type TrainerRow = TrainerForm & { id: string }

export default function AdminTrainers() {
  const [list, setList] = useState<TrainerRow[]>([])
  const [form, setForm] = useState<TrainerForm>({
    name: '', role: '', bio_short: '', specialties: '', photo_url: ''
  })

  const load = async () => {
    const { data } = await supabase.from('trainers').select('*')
    setList((data || []) as TrainerRow[])
  }
  useEffect(() => { load() }, [])

  const save = async () => {
    await supabase.from('trainers').insert(form)
    setForm({ name: '', role: '', bio_short: '', specialties: '', photo_url: '' })
    load()
  }

  return (
    <AdminGuard>
      <div className="p-6">
        <h1 className="text-2xl text-white mb-4">Admin Trainers</h1>
        <div className="grid gap-3 md:grid-cols-2">
          <input className="input-dark" placeholder="Name" value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })} />
          <input className="input-dark" placeholder="Role" value={form.role}
            onChange={e => setForm({ ...form, role: e.target.value })} />
          <input className="input-dark md:col-span-2" placeholder="Bio" value={form.bio_short}
            onChange={e => setForm({ ...form, bio_short: e.target.value })} />
          <input className="input-dark md:col-span-2" placeholder="Specialties" value={form.specialties}
            onChange={e => setForm({ ...form, specialties: e.target.value })} />
          <button className="btn-primary" onClick={save}>Add Trainer</button>
        </div>
        <div className="mt-6 space-y-2">
          {list.map(t => (
            <div key={t.id} className="card p-3">
              <p className="text-white font-medium">{t.name}</p>
              <p className="text-slate-400 text-sm">{t.role}</p>
            </div>
          ))}
        </div>
      </div>
    </AdminGuard>
  )
}
