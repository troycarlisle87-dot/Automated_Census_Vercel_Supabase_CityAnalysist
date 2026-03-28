"use client"
import React, { useState } from 'react'
import { Municipality } from '../utils/types'
import { DashboardNavbar } from './DashboardNavbar'
import { CityDashboard } from '../CityDashboard'



/* 
This component is a shell so that the search feature can be used. 
Since [cityname]/page.tsx is a server component, I can't use state.
This is a way to go arround it.

Instead of [cityname]/page.tsx rendering the Navbar & CityDashboard
it renders this, that renders them both.
*/


interface ShellDashboardProps{
    initialMunicipality: Municipality
}
// An initial city is passed.. but another could be given when the user wants a differnt on in the CityDashboard
export const CityDashboardShell = ({initialMunicipality}:ShellDashboardProps) => {

    // Now.. I can setup the querying
    const [searchQuery, setSearchQuery] = useState("")
  return (
    <main className='space-y-8'>
        <DashboardNavbar onSearchChange={setSearchQuery} searchQuery={searchQuery}/>
        
        {/* The search query is passed the dashboard to be used in the different sections */}
        <CityDashboard initialMunicipality={initialMunicipality} />
    </main>
  )
}
