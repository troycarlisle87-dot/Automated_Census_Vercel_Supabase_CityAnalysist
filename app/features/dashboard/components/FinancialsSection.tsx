
import { Card, CardHeader, CardTitle, CardContent } from '@/app/components/ui/card'
import React from 'react'

const FinancialsSection = () => {
  return (
        <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Budget Allocation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 bg-muted rounded-lg flex items-center justify-center">
                  Budget pie chart / allocation
                </div>
              </CardContent>
            </Card>
          </div>
  )
}

export default FinancialsSection