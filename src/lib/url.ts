export function getBaseUrl(): string {
  return import.meta.env.VITE_BASE_URL || 'http://localhost:3000'
}
