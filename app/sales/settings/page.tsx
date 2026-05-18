import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { SettingsClient } from './client'

export default async function SettingsPage() {
  const session = await getSession()
  
  if (!session) {
    redirect('/sales/login')
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 md:ml-64 flex flex-col w-full">
        <Header session={session} />
        <main className="pt-20">
          <SettingsClient session={session} />
        </main>
      </div>
    </div>
  )
}

