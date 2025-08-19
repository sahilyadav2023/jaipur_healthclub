import './globals.css'

import { Footer } from '@/components/Footer'

export const metadata = {
  title: 'Jaipur Health Club',
  description: 'Premium fitness in Jaipur. Classes, trainers, and offers.',
  openGraph: {
    title: 'Jaipur Health Club',
    description: 'Premium fitness in Jaipur. Classes, trainers, and offers.',
    url: 'https://jaipurhealthclub.com',
    siteName: 'Jaipur Health Club',
    locale: 'en_IN',
    type: 'website'
  },
  metadataBase: new URL('https://jaipurhealthclub.com')
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SportsActivityLocation',
    name: 'Jaipur Health Club',
    image: ['https://jaipurhealthclub.com/og.jpg'],
    telephone: '+91-XXXXXXXXXX',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Vaishali Nagar',
      addressLocality: 'Jaipur',
      addressRegion: 'Rajasthan',
      postalCode: '302021',
      addressCountry: 'IN'
    },
    url: 'https://jaipurhealthclub.com',
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '06:00', closes: '22:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday','Sunday'], opens: '07:00', closes: '20:00' }
    ]
  }

  return (
    <html lang="en">
      <body>

        <main className="min-h-[70vh]">{children}</main>
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  )
}
