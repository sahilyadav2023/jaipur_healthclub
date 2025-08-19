'use client'
import { Section } from '@/components/Section'
import Reveal from '@/components/Reveal'
import { UserHeader } from '@/components/UserHeader'   // ✅ added

const classes = [
  { name: 'Strength Training', desc: 'Full-body workouts with weights and machines.' },
  { name: 'Cardio Blast', desc: 'High-intensity interval training for stamina.' },
  { name: 'Yoga Flow', desc: 'Stretch, balance, and calm your mind.' },
  { name: 'Zumba Dance', desc: 'Energetic dance moves to burn calories.' },
]

const timetable = [
  { day: 'Mon', slots: ['Strength Training – 7 AM', 'Yoga – 6 PM'] },
  { day: 'Tue', slots: ['Cardio Blast – 7 AM', 'Zumba – 6 PM'] },
  { day: 'Wed', slots: ['Strength Training – 7 AM', 'Yoga – 6 PM'] },
  { day: 'Thu', slots: ['Cardio Blast – 7 AM', 'Zumba – 6 PM'] },
  { day: 'Fri', slots: ['Strength Training – 7 AM', 'Yoga – 6 PM'] },
  { day: 'Sat', slots: ['Zumba – 10 AM', 'Open Gym – All Day'] },
]

export default function ClassesPage() {
  return (
    <div className="bg-[#0B0C10] min-h-screen">
      {/* ✅ Navbar */}
      <UserHeader />

      <div className="mx-auto max-w-6xl px-4 py-12">
        {/* Hero header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-white">
            Our <span className="text-brandOrange">Classes</span>
          </h1>
          <p className="mt-3 text-slate-400">Choose a class that fits your vibe.</p>
        </div>

        {/* Class cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {classes.map((c, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="card p-6 hover:-translate-y-1 hover:shadow-lg transition">
                <h2 className="text-lg font-semibold text-white">{c.name}</h2>
                <p className="text-sm text-slate-400 mt-2">{c.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Timetable */}
        <Section title="Weekly Timetable" subtitle="Plan your workouts with ease.">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-sm shadow rounded-2xl overflow-hidden">
              <thead>
                <tr className="bg-brandCard text-slate-200">
                  <th className="px-4 py-3 font-medium text-left">Day</th>
                  <th className="px-4 py-3 font-medium text-left">Classes</th>
                </tr>
              </thead>
              <tbody>
                {timetable.map((row, i) => (
                  <tr
                    key={row.day}
                    className={`${i % 2 === 0 ? 'bg-brandCard/70' : 'bg-brandCard/50'} hover:bg-brandCard transition`}
                  >
                    <td className="px-4 py-3 font-semibold text-brandOrange">{row.day}</td>
                    <td className="px-4 py-3">
                      <ul className="flex flex-col gap-1">
                        {row.slots.map((s, j) => (
                          <li
                            key={j}
                            className="rounded-lg bg-white/5 border border-brandStroke px-3 py-1 text-slate-300 text-xs shadow-sm hover:bg-brandOrange/20 hover:text-white transition"
                          >
                            {s}
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      </div>
    </div>
  )
}
