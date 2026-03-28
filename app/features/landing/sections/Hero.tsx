import React from 'react'
import { MaxWidthWrapper } from '@/app/components/globals/MaxWidthWrapper'
import Link from 'next/link'
import {ArrowRight, Ghost } from 'lucide-react'
import {buttonVariants } from '@/app/components/ui/button'

export const Hero = () => {
    /** 
    Tagline: “Municipal intelligence for every Canadian city.”
    Subtext: one sentence about IBISWorld‑style municipal profiles.
    Primary CTA: “Explore municipalities”
    Secondary CTA: “For city staff”
    */
  return (
    
    <MaxWidthWrapper className="mt-28 sm:mt-30 flex flex-col items-center justify-center text-center">
      <div className = " mx-auto  flex maw-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50 mb-7">
          
          {/**The little pill shaped tag on the landing */}
          <p className = "text-sm font-semibold text-gray-700">
            CityAnalysis is Almost Public!
          </p>
          
      </div>
       <h1 className = "mx-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl ">
          Municipal Intelligence for Every <span className = "text-primary">Canadian City</span> in Seconds
        </h1>
        <p className = "mt-7 max-w-prose sm:text:text-lg  ">
          Our Municipal Explorer allows you to browse, analyze and compare the inner workings of cities all over Canada for deeper insights that can improve your business plan, marketing campaign, research efforts, and most of all, fill your <em>curiosity.</em>
        </p>

        {/**using button variants to make the link a button....just edited the  */}
        {/**This is just a link with button styles!! not acc a button 🤣*/}
        <Link className ={buttonVariants({
          size:'lg', variant:'default', 
          className:"mt-5" 
        })} href={"/dashboard"} target="_blank">
          <span className="text-black">Explore Municipalities</span> <ArrowRight size={20} color='#080808' className='ml-2 h-5 w-5 '/>
        </Link>
        {/**Thinking of adding a second CTA exclusively for city staff... that'll be for later though! */}
        {/**<Link href={"/dashboard"} target="_blank">For City Staff</Link>*/}
        
    </MaxWidthWrapper>

  )
}
