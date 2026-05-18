import {
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { supabase, TopPerformingTrack } from '@/lib/supabase'

export async function TopTracksTable() {
  const { data: tracks, error } = await supabase
    .from('vw_top_performing_tracks')
    .select('*')
    .limit(10)

  const rows: TopPerformingTrack[] = tracks ?? []

  return (
    <Card className="bg-card border-border mb-6">
      <CardHeader>
        <CardTitle>Top Performing Tracks</CardTitle>
        <CardDescription>
          {error ? 'Could not load tracks.' : 'Your best-performing tracks (all time)'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {rows.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4">No track data found.</p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground">Track</TableHead>
                  <TableHead className="text-right text-muted-foreground">Streams</TableHead>
                  <TableHead className="text-right text-muted-foreground">Downloads</TableHead>
                  <TableHead className="text-right text-muted-foreground">Revenue (KSh)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((track, index) => (
                  <TableRow key={track.track_id} className="border-border hover:bg-primary/5">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <Badge
                          variant="secondary"
                          className="w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs bg-accent/20 text-accent"
                        >
                          {index + 1}
                        </Badge>
                        <div>
                          <p className="font-semibold text-foreground">{track.track_title}</p>
                          <p className="text-xs text-muted-foreground">{track.stage_name}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="text-primary font-semibold">
                        {Number(track.total_streams) >= 1000
                          ? `${(Number(track.total_streams) / 1000).toFixed(0)}K`
                          : track.total_streams}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="text-accent font-semibold">
                        {Number(track.total_downloads) >= 1000
                          ? `${(Number(track.total_downloads) / 1000).toFixed(1)}K`
                          : track.total_downloads}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="text-foreground font-semibold">
                        KSh {Number(track.total_revenue_ksh).toLocaleString()}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
