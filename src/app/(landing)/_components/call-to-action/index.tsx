import GradientText from '@/components/global/gradient-text'
import { Button } from '@/components/ui/button'
import { BadgePlus } from 'lucide-react'
import Link from 'next/link'

type Props = {}

const CallToAction = (props: Props) => {
  return (
    <div className='flex flex-col items-start md:items-center gap-y-5 md:gap-y-0'>
        <GradientText
            className='text-[35px] md:text[48px] lg:text-[55px] xl:text-[70px] 2xl:text-[80px] leading-tight font-semibold'
            element='H1'
        >
            Bringing Communities <br className='md:hidden' /> Together
        </GradientText>
        <p className="text-sm md:text-center text-left text-muted-foreground">
            Ascendia is a vibrant online community that empowers people to connect, <br className='md:hidden' />{" "} collaborate, and cultivate meaningful <br className='md:hidden' /> relationships.
        </p>
        <div className="flex flex-col md:flex-row md:justify-center gap-5 md:mt-5 w-full">
            <Button
                variant="outline"
                className='rounded-xl bg-transparent text-base'
            >
                Watch Demo
            </Button>
            <Link href="/sign-up">
                <Button
                    className='rounded-xl flex text-base gap-2 w-full'
                >
                    <BadgePlus /> Get Started
                </Button>
            </Link>
        </div>
    </div>
  )
}

export default CallToAction