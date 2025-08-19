export const Section = ({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) => (
  <section className="mx-auto max-w-6xl px-4 py-12">
    <h2 className="text-3xl font-bold">{title}</h2>
    {subtitle && <p className="mt-2 text-slate-600">{subtitle}</p>}
    <div className="mt-6">{children}</div>
  </section>
)
