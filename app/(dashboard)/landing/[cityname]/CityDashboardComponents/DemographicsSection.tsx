
import React from 'react'
import { Bar, BarChart, CartesianGrid, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'



//importing test data.
import { demographicsData } from '@/app/lib/test_data'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
const DemographicsSection = () => {
  return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Population Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                  Population line chart
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Age Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width={"100%"} minHeight={300}>
                
                            <BarChart data={demographicsData}>
                                <CartesianGrid/>
                                
                                <YAxis />
                                
                                <Bar dataKey={"population"}  />
                                <XAxis dataKey="ageGroup"  name='Age Group'/>
                
                            </BarChart>
                            </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
  )
}

export default DemographicsSection