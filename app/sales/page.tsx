import { Suspense } from 'react'
import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { KPICards } from '@/components/kpi-cards'
import { RevenueChart } from '@/components/revenue-chart'
import { TopTracksTable } from '@/components/top-tracks-table'
import { UploadTrackForm } from '@/components/upload-track-form'
import { getSession } from '@/lib/auth'

function CardSkeleton({ h = 'h-28' }: { h?: string }) {
  return <div className={`${h} rounded-xl bg-card border border-border animate-pulse mb-6`} />
}

export default async function DashboardPage() {
  const session = await getSession()

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 md:ml-64 flex flex-col w-full">
        <Header session={session} />
        <main className="pt-20">
          <div className="p-4 md:p-8">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-2">{session?.stageName || 'Artist'}</h1>
              <p className="text-muted-foreground">Your Song Sales & Performance Dashboard</p>
            </div>

            <Suspense fallback={<div className="grid grid-cols-4 gap-4 mb-6"><CardSkeleton /><CardSkeleton /><CardSkeleton /><CardSkeleton /></div>}>
              <KPICards artistId={session?.artistId} />
            </Suspense>

            <RevenueChart artistId={session?.artistId} />

            <Suspense fallback={<CardSkeleton h="h-64" />}>
              <TopTracksTable artistId={session?.artistId} />
            </Suspense>

            <UploadTrackForm artistId={session?.artistId} />
          </div>
        </main>
      </div>
    </div>
  )
}

