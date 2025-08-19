'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Section } from '@/components/Section'
import Reveal from '@/components/Reveal'
import { UserHeader } from '@/components/UserHeader'   // ✅ added import

export default function HomePage() {
  // Local images from /public
  const aboutImages = ['/jhc/about/a1.jpg', '/jhc/about/a2.jpg']
  const equipmentImages = [
    '/jhc/equipment/e1.jpg','/jhc/equipment/e2.jpg','/jhc/equipment/e3.jpg',
    '/jhc/equipment/e4.jpg','/jhc/equipment/e5.jpg','/jhc/equipment/e6.jpg'
  ]
  const owner = {
    name: 'Nikhil Sahu',
    title: 'Owner & Head Coach',
    photo: '/jhc/owner/owner.jpg',
    bio: `Jaipur Health Club is Nikhil sir's passion project. With 10+ years in strength &
    conditioning and certifications from leading academies, he’s built a friendly,
    goal-oriented space where beginners and athletes both thrive.Nikhil believes in
    clean nutrition and consistency over hacks.`
  }

  // ---- Equipment carousel state ----
  const [index, setIndex] = useState(0)
  const prev = () => setIndex((i) => (i === 0 ? equipmentImages.length - 1 : i - 1))
  const next = () => setIndex((i) => (i === equipmentImages.length - 1 ? 0 : i + 1))

  // Auto play every 4s
  useEffect(() => {
    const timer = setInterval(() => next(), 4000)
    return () => clearInterval(timer)
  }, [index])

  // =========================
  // ✅ Trekking (videos + photos like equipment)
  // =========================
  const trekkingVideos = [
    // put your mp4s in public/jhc/trekking/
    '/jhc/trekking/v1.mp4',
    '/jhc/trekking/v2.mp4',
  ]
  const trekkingImages = [
    '/jhc/trekking/p1.jpg',
    '/jhc/trekking/p2.jpg',
    '/jhc/trekking/p3.jpg',
    '/jhc/trekking/p4.jpg',
  ]
  const [trekIdx, setTrekIdx] = useState(0)
  const trekPrev = () => setTrekIdx((i) => (i === 0 ? trekkingImages.length - 1 : i - 1))
  const trekNext = () => setTrekIdx((i) => (i === trekkingImages.length - 1 ? 0 : i + 1))
  useEffect(() => {
    const t = setInterval(() => trekNext(), 5000)
    return () => clearInterval(t)
  }, [trekIdx])

  return (
    <div className="bg-[#0B0C10] min-h-screen">
      {/* ✅ Navbar added */}
      <UserHeader />

      {/* HERO — Figma style */}
      <section className="relative isolate">
        {/* Background image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/jhc/hero/hero.jpg"  // place your hero image in /public
            alt="Barbell deadlift in a dark gym"
            fill
            priority
            className="object-cover object-center brightness-[.55] contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-transparent" />
        </div>

        <div className="mx-auto max-w-6xl px-4 py-24 md:py-32">
          <Reveal>
            <p className="text-xs tracking-[0.2em] uppercase text-slate-300">Get stronger today</p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-3 max-w-xl text-4xl md:text-6xl font-extrabold text-white leading-tight">
              Transform <span className="text-brandOrange">Your Body</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-4 max-w-xl text-slate-300">
              Programs, nutrition, and classes designed for real results. Start with a free trial and see the difference.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/contact" className="btn-primary">Start Free Trial</Link>
              <Link href="/classes" className="btn-ghost text-slate-200">Explore Classes</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ABOUT + GALLERY */}
      <Section
        title="About Jaipur Health Club"
        subtitle="Community-first gym in the heart of Jaipur — clean space, quality equipment, and results-driven coaching."
      >
        <div className="grid lg:grid-cols-3 gap-6">
          <Reveal className="lg:col-span-1 space-y-4 text-slate-300">
            <p>
              We started JHC to make fitness simple and approachable for everyone — from first-time lifters to seasoned
              athletes. Expect structured programs, friendly vibes, and coaches who actually care about your form and progress.
            </p>
            <p>
              Our facility features dedicated zones for strength, conditioning, mobility, and recovery — plus flexible
              class timings that work with your schedule.
            </p>
          </Reveal>

          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
            {aboutImages.map((src, i) => (
              <Reveal key={src} delay={i * 80}>
                <div className="group relative aspect-[16/10] overflow-hidden rounded-2xl card transition-shadow duration-300 hover:shadow-lg">
                  <Image
                    src={src}
                    alt="Jaipur Health Club facility"
                    fill
                    className="object-cover transition-transform duration-500 ease-out will-change-transform group-hover:scale-[1.05]"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* EQUIPMENT — carousel */}
      <Section
        title="Equipment We Use"
        subtitle="Commercial-grade machines and free weights so you can train safely and effectively."
      >
        <div className="relative max-w-3xl mx-auto">
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl card group">
            <Image
              key={equipmentImages[index]}
              src={equipmentImages[index]}
              alt={`Equipment ${index + 1}`}
              fill
              className="object-cover transition-transform duration-500 ease-out will-change-transform group-hover:scale-[1.05]"
            />
          </div>
          <button
            onClick={prev}
            className="absolute top-1/2 left-3 -translate-y-1/2 rounded-full bg-black/40 text-white p-2 hover:bg-black/60 transition"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full bg-black/40 text-white p-2 hover:bg-black/60 transition"
          >
            ›
          </button>
          <div className="flex justify-center gap-2 mt-4">
            {equipmentImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-2 w-2 rounded-full transition ${i === index ? 'bg-brandOrange' : 'bg-slate-600'}`}
              />
            ))}
          </div>
        </div>
      </Section>

      {/* ✅ NEW: TREKKING — videos + carousel (kept rest of file untouched) */}
      <Section
        title="Trekking & Outdoor Community"
        subtitle="We regularly head outdoors for treks and trail days. Trekking builds stamina, balance, and mental toughness — a perfect complement to strength training."
      >
        {/* Video grid */}
        {trekkingVideos.length > 0 && (
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {trekkingVideos.map((src, i) => (
              <div key={src} className="rounded-2xl overflow-hidden border border-brandStroke bg-black/30">
                <video
                  src={src}
                  controls
                  playsInline
                  className="w-full h-full"
                  preload="metadata"
                  // poster optional: /jhc/trekking/posterX.jpg
                />
              </div>
            ))}
          </div>
        )}

        {/* Image carousel like equipment */}
        <div className="relative max-w-3xl mx-auto">
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl card group">
            <Image
              key={trekkingImages[trekIdx]}
              src={trekkingImages[trekIdx]}
              alt={`Trekking ${trekIdx + 1}`}
              fill
              className="object-cover transition-transform duration-500 ease-out will-change-transform group-hover:scale-[1.05]"
            />
          </div>
          <button
            onClick={trekPrev}
            className="absolute top-1/2 left-3 -translate-y-1/2 rounded-full bg-black/40 text-white p-2 hover:bg-black/60 transition"
          >
            ‹
          </button>
          <button
            onClick={trekNext}
            className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full bg-black/40 text-white p-2 hover:bg-black/60 transition"
          >
            ›
          </button>
          <div className="flex justify-center gap-2 mt-4">
            {trekkingImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setTrekIdx(i)}
                className={`h-2 w-2 rounded-full transition ${i === trekIdx ? 'bg-brandOrange' : 'bg-slate-600'}`}
              />
            ))}
          </div>
        </div>
      </Section>

      {/* OWNER SECTION */}
      <Section title="Meet the Owner">
        <div className="grid md:grid-cols-3 gap-6 items-start">
          <Reveal className="md:col-span-1">
            <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl card hover:shadow-lg">
              <Image
                src={owner.photo}
                alt={owner.name}
                fill
                className="object-cover transition-transform duration-500 ease-out will-change-transform group-hover:scale-[1.04]"
              />
            </div>
          </Reveal>
          <Reveal className="md:col-span-2" delay={100}>
            <h3 className="text-2xl font-bold text-white">{owner.name}</h3>
            <p className="text-sm text-slate-400">{owner.title}</p>
            <p className="mt-4 text-slate-300 leading-relaxed">{owner.bio}</p>
          </Reveal>
        </div>
      </Section>

      {/* WHY US */}
      <Section title="Why Jaipur Health Club?">
        <div className="grid md:grid-cols-3 gap-5">
          {[
            ['Certified Trainers', 'Personalized plans that fit your goals.'],
            ['Flexible Timings', 'Morning to late evening slots across classes.'],
            ['Community Vibe', 'Train with a friendly, supportive crew.'],
          ].map(([h, p], i) => (
            <Reveal key={h} delay={i * 80}>
              <div className="card p-6 hover:-translate-y-[2px] hover:shadow-lg transition">
                <h3 className="text-xl font-semibold text-white">{h}</h3>
                <p className="mt-2 text-slate-300">{p}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </div>
  )
}
