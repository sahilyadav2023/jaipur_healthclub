'use client'
import { useEffect, useRef, useState } from 'react'

export default function Reveal({
  children,
  delay = 0,
  className = ''
}: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setShow(true); io.disconnect() }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={[
        className,
        'transition-all duration-700 ease-out will-change-transform',
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      ].join(' ')}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
