'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import AdminGuard from '@/components/AdminGuard'

type GymClass = { id:string; name:string; description?:string; is_active?:boolean }

export default function AdminClasses() {
  const [list,setList] = useState<GymClass[]>([])
  const [form,setForm] = useState({name:'',description:'',is_active:true})

  const load = async()=> {
    const {data} = await supabase.from('classes').select('*')
    setList((data??[]) as GymClass[])
  }
  useEffect(()=>{load()},[])

  const save = async()=> {
    await supabase.from('classes').insert(form)
    setForm({name:'',description:'',is_active:true})
    load()
  }
  const toggle = async(id:string,is_active?:boolean)=>{
    await supabase.from('classes').update({is_active:!is_active}).eq('id',id); load()
  }
  const remove = async(id:string)=>{ await supabase.from('classes').delete().eq('id',id); load() }

  return (
    <AdminGuard>
      <div className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-2xl font-bold text-white">Classes</h1>
        <div className="card mt-4 grid gap-3 md:grid-cols-2 p-4">
          <input className="input-dark" placeholder="Class name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
          <input className="input-dark md:col-span-2" placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/>
          <label className="flex items-center gap-2 text-slate-300">
            <input type="checkbox" checked={form.is_active} onChange={e=>setForm({...form,is_active:e.target.checked})}/> Active
          </label>
          <button className="btn-primary w-fit" onClick={save}>Add Class</button>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-6">
          {list.map(c=>(
            <div key={c.id} className="card p-4 flex justify-between">
              <div>
                <p className="font-semibold text-white">{c.name}</p>
                <p className="text-xs text-slate-400">{c.description}</p>
              </div>
              <div className="flex gap-2">
                <button className="btn-ghost text-slate-200" onClick={()=>toggle(c.id,c.is_active)}>{c.is_active?'Deactivate':'Activate'}</button>
                <button className="btn-ghost text-slate-200" onClick={()=>remove(c.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminGuard>
  )
}
