import { MaxWidthWrapper } from '@/app/components/globals/MaxWidthWrapper'
import { buttonVariants } from '@/app/components/ui/button'
import { cn } from '../lib/utils'
import Link from 'next/link'

export const LandingFooter = () => {
  return (
    <footer>
        <MaxWidthWrapper className='w-full flex space-y-8 justify-center mt-3 mb-3'>
            <div className='items-center'>
            <span className='font-bold' >Powered by </span>
            <Link href={"https://daedulus.ca/"} className=' font-bold underline underline-offset-3 hover:text-primary hover-effect'>
                <span className={cn(buttonVariants({variant:"outline"}), "font-bold")}>Daedulus Technologies</span>
            </Link>

            </div>
            
        </MaxWidthWrapper>
    </footer>
  )
}
