-- Run this in your Supabase SQL Editor → https://supabase.com/dashboard/project/dkmdvhzdixefykoojhgt/sql

-- 1. Create the storage bucket for artist MP3 files
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'artist-tracks',
  'artist-tracks',
  true,
  52428800,           -- 50 MB per file
  ARRAY['audio/mpeg', 'audio/mp3', 'application/octet-stream']
)
ON CONFLICT (id) DO NOTHING;

-- 2. Allow anyone to read files (public bucket)
CREATE POLICY "Public read access"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'artist-tracks');

-- 3. Allow uploads (no auth required — dev mode)
CREATE POLICY "Allow uploads"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'artist-tracks');

-- 4. Allow deletes
CREATE POLICY "Allow deletes"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'artist-tracks');
