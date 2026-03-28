import React from 'react'
import Image from 'next/image'

export const ProductPreview = () => {
  return (
    

        <div className = "relative isolate mt-20">
          {/**Just learned this... use aria-hidden arguement for purely decorational pieces */}
          {/**it makes the lives of people who use screen readers easier.👌*/}
          {/**Alter the opacity to see path looking thingy design!!*/}
          
            <div>
              <div className = "mx-auto max-w-6xl px-6 lg:px-8">
                <div className = "mt-5 flow-root sm:mt-14">
                  {/** Add the image of the dashboard below, once you've gotten to this point. */}
                  <div className = "rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                    {/* Using a default image for now!*/}
                    <Image src = '/cityanalysis.ca-dashboard-img.png'
                      alt = 'Product Preview'
                      width ={1902}
                      height = {907}
                      quality={100}
                      className='rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-l ring-gray-100/10'
                    />

                  </div>
                </div>
              </div>
            </div>

              {/**Just copied and pasted the design from the top to here.  */}
              <div aria-hidden = "true" className= "pointer-events-none inset-0 -top -z-10 transform-gpu overflow-hidden blur-3xl     sm:-top-80">
              <div style = {{
                clipPath:"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
              }}className = "relative left-[calc(50%-13rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-30deg bg-gradient-to-tr from [#ff80b5] to-[#9089fc] opacity-50 sm:left-[calc(50%-36rem)] sm:w-72.1875rem "/>
              </div>

        </div>
  
  )
}
