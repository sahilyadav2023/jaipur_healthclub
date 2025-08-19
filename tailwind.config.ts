import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
// extend -> colors
extend: {
  colors: {
    brandOrange: '#FF8A00',     // CTA / accents
    brandDark:   '#0B0C10',     // page bg
    brandCard:   '#111317',     // card bg
    brandStroke: '#1F2229',  }   // borders
  },
},

  plugins: [],
}
export default config
