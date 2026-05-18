import { cookies } from 'next/headers'

export type SessionPayload = {
  artistId: string
  stageName: string
  username: string
  email: string
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('sales_session')?.value
  
  if (!sessionCookie) return null
  
  try {
    const jsonStr = Buffer.from(sessionCookie, 'base64').toString('utf-8')
    return JSON.parse(jsonStr) as SessionPayload
  } catch (e) {
    return null
  }
}

export async function setSession(payload: SessionPayload) {
  const cookieStore = await cookies()
  const val = Buffer.from(JSON.stringify(payload)).toString('base64')
  
  cookieStore.set('sales_session', val, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7 // 1 week
  })
}

export async function clearSession() {
  const cookieStore = await cookies()
  cookieStore.delete('sales_session')
}
