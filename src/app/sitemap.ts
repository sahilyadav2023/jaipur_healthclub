import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://jaipurhealthclub.com'
  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/classes`, lastModified: new Date() },
    { url: `${base}/trainers`, lastModified: new Date() },
    { url: `${base}/offers`, lastModified: new Date() },
    { url: `${base}/contact`, lastModified: new Date() }
  ]
}
