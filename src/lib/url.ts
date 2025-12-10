const PRODUCTION_URL = 'https://nigeriastats.com'

// Get the base URL for OG images and assets (uses current deployment URL)
export function getBaseUrl(): string {
  // Vercel deployment URL (preview/production)
  if (import.meta.env.VITE_VERCEL_URL) {
    return `https://${import.meta.env.VITE_VERCEL_URL}`
  }

  // Development fallback
  if (import.meta.env.DEV) {
    return 'http://localhost:3000'
  }

  // Production fallback
  return PRODUCTION_URL
}

// Get the canonical URL (always production for SEO)
export function getCanonicalUrl(): string {
  return PRODUCTION_URL
}
