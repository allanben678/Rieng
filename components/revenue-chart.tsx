'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts'
import { supabase } from '@/lib/supabase'

interface ChartPoint {
  month: string
  revenue: number
  streams: number
}

export function RevenueChart() {
  const [data, setData] = useState<ChartPoint[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetch() {
      const { data: rows } = await supabase
        .from('track_performance')
        .select('metric_month, streams, revenue_ksh')
        .order('metric_month', { ascending: true })

      if (rows) {
        const grouped: Record<string, { revenue: number; streams: number }> = {}
        rows.forEach((r) => {
          const key = r.metric_month
          if (!grouped[key]) grouped[key] = { revenue: 0, streams: 0 }
          grouped[key].revenue += Number(r.revenue_ksh ?? 0)
          grouped[key].streams += Number(r.streams ?? 0)
        })

        const points: ChartPoint[] = Object.entries(grouped).map(([month, v]) => ({
          month: new Date(month).toLocaleDateString('en-KE', { month: 'short', year: '2-digit' }),
          revenue: Math.round(v.revenue),
          streams: v.streams,
        }))

        let finalData = points;
        
        if (points.length === 0) {
          const d = new Date()
          const emptyPoints: ChartPoint[] = []
          for (let i = 5; i >= 0; i--) {
            const monthDate = new Date(d.getFullYear(), d.getMonth() - i, 1)
            emptyPoints.push({
              month: monthDate.toLocaleDateString('en-KE', { month: 'short', year: '2-digit' }),
              revenue: 0,
              streams: 0,
            })
          }
          finalData = emptyPoints
        }
        
        setData(finalData)
      }
      setLoading(false)
    }
    fetch()
  }, [])

  return (
    <Card className="bg-card border-border mb-6">
      <CardHeader>
        <CardTitle>Revenue & Streams</CardTitle>
        <CardDescription>Monthly performance from Supabase</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-[300px] flex items-center justify-center text-muted-foreground text-sm">
            Loading chart…
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
              <XAxis dataKey="month" stroke="#a0a0a0" style={{ fontSize: '0.875rem' }} />
              <YAxis stroke="#a0a0a0" style={{ fontSize: '0.875rem' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a1a1a',
                  border: '1px solid #2a2a2a',
                  borderRadius: '0.5rem',
                  color: '#f5f5f5',
                }}
              />
              <Legend />
              <Line
                type="monotone" dataKey="revenue" stroke="#00ff88" strokeWidth={2}
                dot={{ fill: '#00ff88', r: 4 }} activeDot={{ r: 6 }} name="Revenue (KSh)"
              />
              <Line
                type="monotone" dataKey="streams" stroke="#ff0080" strokeWidth={2}
                dot={{ fill: '#ff0080', r: 4 }} activeDot={{ r: 6 }} name="Streams"
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}
