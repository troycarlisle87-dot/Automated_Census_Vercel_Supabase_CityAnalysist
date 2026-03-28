import React from 'react'
//import { MaxWidthWrapper } from '../MaxWidthWrapper'
import Link from 'next/link'
import Image from 'next/image'
export const HowItWorks = () => {
    /**3 steps: “Ingest public data → Standardize indicators → Deliver municipal profiles.” */
  return (
      <div className = "mx-auto mb-32 max-w-5xl -mt-40">
        <div className = "mb-12 px-6 lg:px-8">
          <h2 className ='font-bold mt-2 text-4xl text-shadow-gray-900 sm:text-5xl '>
             Start Exploring Municipalities in Minutes
          </h2>
          <p className = " mt-4 text-lg">
            Viewing and analyzing microeconomic data has never been easier with Daedulus' Municipal Intelligence Platform.
          </p>

        </div>

        {/* Step 1 */}
        <ol className = " my-8 space-y-4 pt-2 md:flex md:space-x-12 md:space-y-0">
          <li className='md:flex-1'>
          <div className = "flex flex-col space y-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 m:pl-0 md:pt-4">
            <span className = "text-sm font-medium text-primary">
              Step 1
            </span>
            <span className = " text-xl font-semibold">Sign up for an account </span>
            <span className="mt-2"> Either starting out with a free plan or our {' '}
              <Link href="/pricing" className="text-destructive underline underline-offset-3">
              insider plan
              </Link>
              .
            </span>
          </div>
          </li>

          {/* Step 2 */}
          {/**Just copied and pasted this... it's trivial to make this reusable! */}
          <li className='md:flex-1'>
            <div className = "flex flex-col space y-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 m:pl-0 md:pt-4">
              <span className = "text-sm font-medium text-primary">
                Step 2
              </span>
              <span className = " text-xl font-semibold">Select a city/ municipality</span>
              <span className="mt-2"> We&apos;ll provide you with all factual data about it. Elegantly presented of course.</span>
            </div>
          </li>

          <li className='md:flex-1'>
            <div className = "flex flex-col space y-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 m:pl-0 md:pt-4">
              <span className = "text-sm font-medium text-primary">
                Step 3
              </span>
              <span className = " text-xl font-semibold">Start exploring and analyzing</span>
              <span className="mt-2"> It&apos;s that simple. Start analyzing today - it really takes less than a minute.</span>
            </div>
          </li>
        </ol>

        {/* the Search image-block */}
        <div className = "mx-auto max-w-6xl px-6 lg:px-8">
          <div className = "mt-5 flow-root sm:mt-14">
            {/** Add the image of the dashboard below, once you've gotten to this point. */}
            <div className = "rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              {/* Using a default image for now!.. in /public*/}
              <Image src = {"/cityanalysis.ca-searchfeature.png"}
                alt = 'Search Preview'
                width ={1897}
                height = {907}
                quality={100}
                className='rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-l ring-gray-100/10'
              />

            </div>
          </div>
        </div>
      </div>
  
    
  )
}
