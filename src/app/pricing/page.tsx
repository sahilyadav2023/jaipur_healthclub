'use client'
import { UserHeader } from '@/components/UserHeader'

type Row = { label: string; price: number | string }
type Block = { title: string; rows: Row[]; note?: string }

const PRICING: Block[] = [
  {
    title: 'Gym Membership',
    rows: [
      { label: '1 Month',  price: 1500 },
      { label: '3 Months', price: 3500 },
      { label: '6 Months', price: 5500 },
      { label: '12 Months', price: 8000 },
    ],
  },
  {
    title: 'Combo Membership',
    rows: [
      { label: '1M Gym + 1M PT', price: 5200 },
      { label: '3M Gym + 3M PT', price: 13000 },
    ],
  },
  {
    title: 'Personal Training',
    rows: [
      { label: '1 Month',  price: 5000 },
      { label: '3 Months', price: 12500 },
    ],
  },
  {
    title: 'Couple Membership',
    rows: [{ label: '12M + 12M (20% Discount)', price: 16000 }],
    note: 'Best value for couples',
  },
]

export default function PricingPage() {
  return (
    <div className="bg-[#0B0C10] min-h-screen">
      <UserHeader />

      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-white">Membership <span className="text-brandOrange">Pricing</span></h1>
          <p className="mt-3 text-slate-400">Clear, simple plans—just like the poster in the gym.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {PRICING.map((block) => (
            <div key={block.title} className="rounded-2xl border border-brandStroke bg-[rgb(17,18,23)]/90 shadow-sm">
              {/* header bar like poster strip */}
              <div className="flex items-center justify-between px-5 py-3 rounded-t-2xl bg-gradient-to-r from-brandOrange to-amber-600 text-black font-semibold">
                <span className="uppercase tracking-wide">{block.title}</span>
                <span className="text-xs opacity-80">Price (₹)</span>
              </div>

              <div className="p-5">
                <ul className="divide-y divide-white/5">
                  {block.rows.map((r) => (
                    <li key={r.label} className="flex items-center justify-between py-3">
                      <span className="text-slate-200">{r.label}</span>
                      <span className="text-white font-bold">₹{r.price}</span>
                    </li>
                  ))}
                </ul>

                {block.note && (
                  <div className="mt-4 text-xs font-medium text-black inline-block rounded-full bg-yellow-400/90 px-3 py-1">
                    {block.note}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* call-to-action like the poster footer */}
        <div className="mt-12 text-center">
          <p className="text-slate-400 text-sm">Questions or custom plans?</p>
          <a href="tel:+917417010861" className="btn-primary mt-3 inline-flex">Call 7417010861</a>
        </div>
      </div>
    </div>
  )
}
