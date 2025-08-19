'use client'
import { supabase } from '@/lib/supabaseClient'
import { useState } from 'react'

export default function UploadImage({
  onUploaded, folder = 'uploads'
}: { onUploaded: (publicUrl: string) => void; folder?: string }) {
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  const handle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setBusy(true); setErr(null)
    const ext = file.name.split('.').pop()
    const path = `${folder}/${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`
    const { error } = await supabase.storage.from('media').upload(path, file, { upsert: false })
    if (error) { setErr(error.message); setBusy(false); return }
    const { data } = supabase.storage.from('media').getPublicUrl(path)
    onUploaded(data.publicUrl)
    setBusy(false)
  }

  return (
    <div className="flex items-center gap-3">
      <label className="inline-flex cursor-pointer items-center rounded-2xl border px-4 py-2">
        <input type="file" accept="image/*" className="hidden" onChange={handle} />
        {busy ? 'Uploading…' : 'Upload Image'}
      </label>
      {err && <span className="text-sm text-red-600">{err}</span>}
    </div>
  )
}
