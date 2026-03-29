

import { MaxWidthWrapper } from '@/app/components/globals/MaxWidthWrapper'
import Link from 'next/link'

import { buttonVariants } from '@/app/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
//import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components"; <-- from kind



export const NavBar = () => {
  return (
    <nav className = "sticky h-14 inset-x-o top-0 z-30 w-full border-b border-b-gray-200 bg-white/75 backdrop-blur-lg transition-all">
    
    {/**using this to make it match the rest of the application.  */}
        <MaxWidthWrapper>
            <div className = "flex h-14 items-center justify-between border-b border-b-zinc-200">

            {/**Want the logo in the navbar as always.  */}

            <Link href = "/" className = {buttonVariants({variant:'ghost', size:'lg'})} >
                <Image
                    src="/Logo1.svg"
                    alt="City Analysis"
                    width={142}
                    height={42}
                />
            </Link>

            {/** gotta add a mobile navbar! */}

            <div className='flex items-center space-x-4 sm:flex'>
                <>
                {/**Using a fragement so that the DOM isn't extended. */}
                <Link href = {"/pricing"} className={buttonVariants({
                    variant:'ghost',
                     size:"sm", 
                     className: "mr-4"})}>
                    Pricing
                </Link>
                <Link className={buttonVariants({variant:'ghost', size:"sm"})} href={"/login"}>
                    Login
                </Link>

                <Link className={buttonVariants({variant:'outline', size:"sm"})} href={"/landing"}>
                    Get Started <ArrowRight className='h-5 w-5'/>
                </Link>

        
                </>


            </div>

            </div>


        </MaxWidthWrapper>

    </nav>
  )
}

