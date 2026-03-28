import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import React from 'react'

const AdministrationSection = () => {
  return (
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <Card>
      <CardHeader>
        <CardTitle>Staff Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
          Staff roles table/chart
        </div>
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle>Department Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
          Dept performance
        </div>
      </CardContent>
    </Card>
    </div>
  )
}

export default AdministrationSection