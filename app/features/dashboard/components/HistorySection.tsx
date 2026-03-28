
import { Card } from '@/app/components/ui/card'
import { Clock } from 'lucide-react'
import React from 'react'

export const HistorySection = () => {
  return (
    <Card className="p-8 text-center">
      <Clock className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-xl font-semibold mb-2">Historical Data Coming Soon</h3>
      <p>Year-over-year trends for all KPIs</p>
    </Card>
  )
}
