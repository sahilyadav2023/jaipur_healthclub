'use client'
import { UserHeader } from '@/components/UserHeader'

export default function ContactPage() {
  // ✏️ Edit these two lines with your real details
  const ADDRESS = 'Jaipur Health Club, Vaishali Nagar, Jaipur, Rajasthan 302021'
  const PHONE = '+91 7417010861'

  return (
    <div className="bg-[#0B0C10] min-h-screen">
      <UserHeader />

      <div className="mx-auto max-w-6xl px-4 py-12">
        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-white">
            Contact <span className="text-brandOrange">Us</span>
          </h1>
          <p className="mt-3 text-slate-400">
            Reach out for memberships, class timings, or general queries.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Address + Phone */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-white">Address</h2>
            <p className="mt-2 text-slate-300">{ADDRESS}</p>

            <h2 className="text-xl font-semibold text-white mt-6">Phone</h2>
            <p className="mt-2">
              <a href={`tel:${PHONE.replace(/\s+/g, '')}`} className="btn-primary inline-flex">
                Call {PHONE}
              </a>
            </p>

            {/* Optional: WhatsApp button — change to your WA number if needed */}
            <p className="mt-3">
              <a
                className="btn-ghost inline-flex"
                href={`https://wa.me/${PHONE.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp Us
              </a>
            </p>
          </div>

          {/* Hours */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-white">Business Hours</h2>
            <div className="mt-4 rounded-xl border border-brandStroke overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  <tr className="bg-white/5">
                    <td className="px-4 py-3 text-slate-400">Morning</td>
                    <td className="px-4 py-3 text-white font-medium">5:00 AM – 10:00 AM</td>
                  </tr>
                  <tr className="bg-white/0">
                    <td className="px-4 py-3 text-slate-400">Evening</td>
                    <td className="px-4 py-3 text-white font-medium">5:00 PM – 9:00 PM</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-slate-400">Open all days. Holiday hours may vary.</p>
          </div>
        </div>

        {/* Optional Map embed — replace q= with your exact address if you want */}
        <div className="mt-8 card overflow-hidden">
          <iframe
            title="Map"
            className="w-full h-[340px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`}
          />
        </div>
      </div>
    </div>
  )
}
