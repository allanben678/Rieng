import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, Music, Users, Download } from 'lucide-react'
import { supabase, getMonthStart } from '@/lib/supabase'

interface KPICardProps {
  title: string
  value: string
  description: string
  icon: React.ReactNode
  trend?: string
  trendUp?: boolean
}

function KPICard({ title, value, description, icon, trend, trendUp }: KPICardProps) {
  return (
    <Card className="bg-card border-border hover:border-primary/50 transition-all duration-200">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
          <div className="text-primary">{icon}</div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <p className="text-3xl font-bold text-foreground">{value}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
          {trend && (
            <p className={`text-xs font-semibold mt-2 ${trendUp ? 'text-primary' : 'text-destructive'}`}>
              {trendUp ? '↑' : '↓'} {trend}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function fmt(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`
  return n.toString()
}

function trend(current: number, prev: number) {
  if (prev === 0) return undefined
  const pct = (((current - prev) / prev) * 100).toFixed(1)
  return { label: `${Math.abs(Number(pct))}% from last month`, up: Number(pct) >= 0 }
}

export async function KPICards() {
  const thisMonth = getMonthStart(0)
  const lastMonth = getMonthStart(-1)

  const [{ data: cur }, { data: prev }, { data: artist }] = await Promise.all([
    supabase.from('track_performance').select('streams, downloads, revenue_ksh').eq('metric_month', thisMonth),
    supabase.from('track_performance').select('streams, downloads, revenue_ksh').eq('metric_month', lastMonth),
    supabase.from('artists').select('total_active_listeners').single(),
  ])

  const sum = (arr: typeof cur, key: 'streams' | 'downloads' | 'revenue_ksh') =>
    (arr ?? []).reduce((s, r) => s + Number(r[key] ?? 0), 0)

  const curStreams = sum(cur, 'streams')
  const curRevenue = sum(cur, 'revenue_ksh')
  const curDownloads = sum(cur, 'downloads')
  const prevStreams = sum(prev, 'streams')
  const prevRevenue = sum(prev, 'revenue_ksh')

  const streamTrend = trend(curStreams, prevStreams)
  const revTrend = trend(curRevenue, prevRevenue)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <KPICard
        title="Total Streams"
        value={fmt(curStreams)}
        description="This month"
        icon={<Music className="w-5 h-5" />}
        trend={streamTrend?.label}
        trendUp={streamTrend?.up}
      />
      <KPICard
        title="Revenue"
        value={`KSh ${curRevenue.toLocaleString()}`}
        description="This month"
        icon={<TrendingUp className="w-5 h-5" />}
        trend={revTrend?.label}
        trendUp={revTrend?.up}
      />
      <KPICard
        title="Downloads"
        value={fmt(curDownloads)}
        description="This month"
        icon={<Download className="w-5 h-5" />}
      />
      <KPICard
        title="Active Listeners"
        value={(artist?.total_active_listeners ?? 0).toLocaleString()}
        description="Unique listeners"
        icon={<Users className="w-5 h-5" />}
      />
    </div>
  )
}
