"use client" // to use recharts.. this has to be a client component

import {CartesianGrid, Line, LineChart, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts'

import { budgetData, kpis } from '@/app/lib/test_data'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/app/components/ui/card'

// no need for prop drilling... just use the context

import { useData } from '@/app/providers/DataProvider'

const OverviewSection = () => {
    const {data} = useData()

  return (
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <Card>
        <CardHeader>
        <CardTitle>Budget Trends</CardTitle>
        <CardDescription>Monthly overview</CardDescription>
        </CardHeader>
        <CardContent>
        {/* Placeholder for chart */}
        
            <ResponsiveContainer width={"100%"} minHeight={300}>

            <LineChart data={budgetData}  margin={{left:10}} >
                <CartesianGrid/>
                
                <XAxis dataKey="month" name='Month'/>
                <YAxis />
                <Tooltip/>
                <Line dataKey={"planned"} type={"monotone"} stroke='#7f22fe' />

            </LineChart>
            </ResponsiveContainer>
        
        </CardContent>
    </Card>
    <Card>
        <CardHeader>
        <CardTitle>Service Performance</CardTitle>
        <CardDescription>Key metrics</CardDescription>
        </CardHeader>
        <CardContent>
            <ResponsiveContainer width={"99%"} height={300}>
            <RadarChart data={kpis} responsive>
                <PolarGrid/>
                <PolarAngleAxis dataKey={"name"}/>
                <PolarRadiusAxis/>
                <Radar dataKey={"current"} stroke='#7f22fe' fillOpacity={0.60} fill='#8884d8'/>


            </RadarChart>
            
        </ResponsiveContainer>
        </CardContent>
    </Card>
    </div>
        
  )
}

export default OverviewSection