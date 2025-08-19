'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import AdminGuard from '@/components/AdminGuard'

type ClassSession = {
  id: string
  class_id?: string | null
  trainer_id?: string | null
  weekday: number
  start_time: string
  end_time: string
  capacity?: number
  is_active?: boolean
}

const weekdays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

export default function AdminClassSessions() {
  const [list, setList] = useState<ClassSession[]>([])
  const [form, setForm] = useState({
    weekday: 1,
    start_time: '',
    end_time: '',
    capacity: 20,
    is_active: true,
  })

  const load = async () => {
    const { data, error } = await supabase.from('class_sessions').select('*').order('weekday')
    if (error) console.error('Load error', error)
    setList((data ?? []) as ClassSession[])
  }
  useEffect(() => { load() }, [])

  const save = async () => {
    if (!form.start_time || !form.end_time) return
    await supabase.from('class_sessions').insert(form)
    setForm({ weekday: 1, start_time: '', end_time: '', capacity: 20, is_active: true })
    load()
  }

  const toggle = async (id: string, is_active?: boolean) => {
    await supabase.from('class_sessions').update({ is_active: !is_active }).eq('id', id)
    load()
  }
  const remove = async (id: string) => {
    await supabase.from('class_sessions').delete().eq('id', id)
    load()
  }

  return (
    <AdminGuard>
      <div className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-2xl font-bold text-white">Class Sessions</h1>

        {/* Form */}
        <div className="card mt-4 grid gap-3 md:grid-cols-2 p-4">
          <select
            className="input-dark"
            value={form.weekday}
            onChange={e=>setForm({...form, weekday:Number(e.target.value)})}
          >
            {weekdays.map((d,i)=>(
              <option key={i} value={i}>{d}</option>
            ))}
          </select>
          <input
            type="time"
            className="input-dark"
            value={form.start_time}
            onChange={e=>setForm({...form, start_time:e.target.value})}
          />
          <input
            type="time"
            className="input-dark"
            value={form.end_time}
            onChange={e=>setForm({...form, end_time:e.target.value})}
          />
          <input
            type="number"
            className="input-dark"
            placeholder="Capacity"
            value={form.capacity}
            onChange={e=>setForm({...form, capacity:Number(e.target.value)})}
          />
          <label className="flex items-center gap-2 text-slate-300">
            <input
              type="checkbox"
              checked={form.is_active}
              onChange={e=>setForm({...form, is_active:e.target.checked})}
            /> Active
          </label>
          <button className="btn-primary w-fit" onClick={save}>Add Session</button>
        </div>

        {/* List */}
        <div className="grid gap-4 mt-6">
          {list.map(s=>(
            <div key={s.id} className="card p-4 flex justify-between">
              <div>
                <p className="font-semibold text-white">
                  {weekdays[s.weekday]} {s.start_time}–{s.end_time}
                </p>
                <p className="text-xs text-slate-400">Capacity: {s.capacity}</p>
              </div>
              <div className="flex gap-2">
                <button className="btn-ghost text-slate-200" onClick={()=>toggle(s.id,s.is_active)}>
                  {s.is_active ? 'Deactivate' : 'Activate'}
                </button>
                <button className="btn-ghost text-slate-200" onClick={()=>remove(s.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminGuard>
  )
}
