import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Artist Portal - RiengRadio',
  description: 'Manage your music, sales, and performance on RiengRadio.',
}

export default function SalesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
