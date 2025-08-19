'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import AdminGuard from '@/components/AdminGuard'

type Testimonial = { id:string; author:string; message:string; is_active?:boolean }

export default function AdminTestimonials() {
  const [list,setList] = useState<Testimonial[]>([])
  const [form,setForm] = useState({author:'',message:'',is_active:true})

  const load = async()=> {
    const {data} = await supabase.from('testimonials').select('*')
    setList((data??[]) as Testimonial[])
  }
  useEffect(()=>{load()},[])

  const save = async()=> {
    await supabase.from('testimonials').insert(form)
    setForm({author:'',message:'',is_active:true})
    load()
  }
  const toggle = async(id:string,is_active?:boolean)=>{ await supabase.from('testimonials').update({is_active:!is_active}).eq('id',id); load() }
  const remove = async(id:string)=>{ await supabase.from('testimonials').delete().eq('id',id); load() }

  return (
    <AdminGuard>
      <div className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-2xl font-bold text-white">Testimonials</h1>
        <div className="card mt-4 grid gap-3 p-4">
          <input className="input-dark" placeholder="Author" value={form.author} onChange={e=>setForm({...form,author:e.target.value})}/>
          <textarea className="input-dark" placeholder="Message" value={form.message} onChange={e=>setForm({...form,message:e.target.value})}/>
          <label className="flex items-center gap-2 text-slate-300">
            <input type="checkbox" checked={form.is_active} onChange={e=>setForm({...form,is_active:e.target.checked})}/> Active
          </label>
          <button className="btn-primary w-fit" onClick={save}>Add Testimonial</button>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-6">
          {list.map(t=>(
            <div key={t.id} className="card p-4 flex justify-between">
              <div>
                <p className="font-semibold text-white">{t.author}</p>
                <p className="text-slate-300 text-sm mt-1">{t.message}</p>
              </div>
              <div className="flex gap-2">
                <button className="btn-ghost text-slate-200" onClick={()=>toggle(t.id,t.is_active)}>{t.is_active?'Deactivate':'Activate'}</button>
                <button className="btn-ghost text-slate-200" onClick={()=>remove(t.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminGuard>
  )
}
