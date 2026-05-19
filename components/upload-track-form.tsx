'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Upload, X, Check, AlertCircle, Loader2, Music } from 'lucide-react'
import { supabase, STORAGE_BUCKET } from '@/lib/supabase'

export function UploadTrackForm({ artistId }: { artistId?: string }) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    trackName: '',
    description: '',
    price: '',
    mp3File: null as File | null,
  })
  const [fileName, setFileName] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const valid = file.type === 'audio/mpeg' || file.name.endsWith('.mp3')
    if (!valid) { setError('Please select a valid MP3 file'); return }
    setFormData((prev) => ({ ...prev, mp3File: file }))
    setFileName(file.name)
    setError('')
  }

  const handleClearFile = () => {
    setFormData((prev) => ({ ...prev, mp3File: null }))
    setFileName('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.trackName || !formData.description || !formData.price || !formData.mp3File) {
      setError('Please fill in all fields and select an MP3 file')
      return
    }

    setUploading(true)
    setError('')

    try {
      if (!artistId) throw new Error('Artist ID not found. Please log in again.')

      // 1. Upload MP3 to Supabase Storage
      setUploadProgress('Uploading audio file…')
      const ext = formData.mp3File.name.split('.').pop()
      const filePath = `${artistId}/${Date.now()}.${ext}`

      const { error: uploadErr } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(filePath, formData.mp3File, { contentType: 'audio/mpeg', upsert: false })

      if (uploadErr) throw new Error(`Storage error: ${uploadErr.message}`)

      // 2. Get public URL
      const { data: urlData } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(filePath)

      // 3. Insert track into DB
      setUploadProgress('Saving track details…')
      const { error: insertErr } = await supabase.from('tracks').insert({
        artist_id: artistId,
        title: formData.trackName,
        description: formData.description,
        price_ksh: Number(formData.price),
        mp3_file_path: urlData.publicUrl,
      })

      if (insertErr) throw new Error(`Database error: ${insertErr.message}`)

      setSuccess(true)
      setFormData({ trackName: '', description: '', price: '', mp3File: null })
      setFileName('')
      setUploadProgress('')
      router.refresh() // re-runs server components (KPI cards, tracks table)
      setTimeout(() => setSuccess(false), 4000)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Upload failed. Please try again.')
    } finally {
      setUploading(false)
      setUploadProgress('')
    }
  }

  return (
    <Card className="bg-card border-border mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Music className="w-5 h-5 text-primary" />
          Upload New Track
        </CardTitle>
        <CardDescription>Add a new track to your catalog — MP3 stored in Supabase</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-4 p-3 bg-destructive/10 border border-destructive/30 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-destructive shrink-0" />
            <span className="text-sm text-destructive">{error}</span>
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-primary/10 border border-primary/30 rounded-lg flex items-center gap-2">
            <Check className="w-5 h-5 text-primary" />
            <span className="text-sm text-primary">Track uploaded successfully! Dashboard refreshed.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="trackName" className="block text-sm font-medium text-foreground">
                Track Name
              </label>
              <Input
                id="trackName" name="trackName"
                placeholder="e.g., Midnight Cipher"
                value={formData.trackName} onChange={handleInputChange}
                className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                disabled={uploading}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="price" className="block text-sm font-medium text-foreground">
                Price (KSh)
              </label>
              <Input
                id="price" name="price" type="number" min="0"
                placeholder="e.g., 150"
                value={formData.price} onChange={handleInputChange}
                className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                disabled={uploading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium text-foreground">
              Description
            </label>
            <Textarea
              id="description" name="description"
              placeholder="Describe your track, mood, genre…"
              value={formData.description} onChange={handleInputChange}
              rows={3}
              className="bg-input border-border text-foreground placeholder:text-muted-foreground resize-none"
              disabled={uploading}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">MP3 File</label>
            <input type="file" accept=".mp3,audio/mpeg" onChange={handleFileChange}
              className="hidden" id="mp3-upload" disabled={uploading} />
            {!fileName ? (
              <label
                htmlFor="mp3-upload"
                className="flex items-center justify-center w-full px-4 py-8 border-2 border-dashed border-primary/40 rounded-lg bg-primary/5 hover:bg-primary/10 cursor-pointer transition-colors duration-200"
              >
                <div className="text-center">
                  <Upload className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-sm font-medium text-foreground">Click to upload MP3</p>
                  <p className="text-xs text-muted-foreground mt-1">Max 50 MB</p>
                </div>
              </label>
            ) : (
              <div className="flex items-center justify-between p-3 bg-primary/10 border border-primary/30 rounded-lg">
                <div className="flex items-center gap-2">
                  <Music className="w-4 h-4 text-primary" />
                  <span className="text-sm text-foreground font-medium truncate max-w-xs">{fileName}</span>
                </div>
                <button type="button" onClick={handleClearFile} disabled={uploading}
                  className="text-muted-foreground hover:text-foreground disabled:opacity-40">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <Button
            type="submit"
            disabled={uploading}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
          >
            {uploading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                {uploadProgress || 'Uploading…'}
              </span>
            ) : 'Upload Track'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
