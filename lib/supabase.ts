import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

// ── Types ──────────────────────────────────────────────
export interface Artist {
  id: string
  user_id: string
  stage_name: string
  total_active_listeners: number
  created_at: string
  updated_at: string
}

export interface Track {
  id: string
  artist_id: string
  title: string
  description: string | null
  price_ksh: number
  mp3_file_path: string | null
  created_at: string
  updated_at: string
}

export interface TrackPerformance {
  id: string
  track_id: string
  metric_month: string
  streams: number
  downloads: number
  revenue_ksh: number
}

export interface TopPerformingTrack {
  track_id: string
  artist_id: string
  track_title: string
  stage_name: string
  total_streams: number
  total_downloads: number
  total_revenue_ksh: number
}

// ── Helpers ────────────────────────────────────────────
export const ARTIST_ID = '11111111-1111-1111-1111-111111111111'
export const STORAGE_BUCKET = 'artist-tracks'

export function getMonthStart(offset = 0): string {
  const d = new Date()
  return new Date(d.getFullYear(), d.getMonth() + offset, 1)
    .toISOString()
    .split('T')[0]
}
