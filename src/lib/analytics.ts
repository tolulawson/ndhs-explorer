import { initializeApp } from 'firebase/app'
import { getAnalytics, logEvent, isSupported } from 'firebase/analytics'
import type { Analytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

let analytics: Analytics | null = null

export const initAnalytics = async () => {
  if (analytics) return analytics

  console.log('[Analytics] Initializing...', {
    hasApiKey: !!firebaseConfig.apiKey,
    projectId: firebaseConfig.projectId,
    mode: import.meta.env.MODE
  })

  const supported = await isSupported()
  if (supported) {
    const app = initializeApp(firebaseConfig)
    analytics = getAnalytics(app)
    return analytics
  }
  return null
}

export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  if (analytics) {
    logEvent(analytics, eventName, params)
  }
}
