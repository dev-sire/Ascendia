import BackdropGradient from "@/components/global/backdrop-gradient"
import GradientText from "@/components/global/gradient-text"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { Check } from "@/icons/check"
import Link from "next/link"

type Props = {}

export const PricingSection = (props: Props) => {
  return (
    <div 
        className='w-full pt-20 flex flex-col items-center gap-3'
        id="pricing"
    >
        <BackdropGradient className="w-8/12 h-full opacity-40 flex flex-col items-center">
            <GradientText
                className="text-4xl font-semibold text-center"
                element="H1"
            >
                Pricing Plans That Fit Your Right
            </GradientText>
            <p className="text-sm md:text-center text-center mt-3 text-muted-foreground">
                Ascendia is a vibrant online community platform that empowers
                people to connect, <br className="hidden md:block" />
                collaborate, and cultivate meaningful relationships
            </p>
        </BackdropGradient>
        <Card className="p-7 mt-10 md:w-auto w-full bg-themeBlack border-themeGray">
            <div className="flex flex-col gap-2">
                <CardTitle className="">999/m</CardTitle>
                <CardDescription className="text-[#B4B0AE]">
                    Great if you're just getting started
                </CardDescription>
                <Link href="#" className="w-full mt-3">
                    <Button
                        variant="default"
                        className="bg-[#333337] w-full rounded-2xl text-white hover:text-[#333337]"
                    >
                        Start for free
                    </Button>
                </Link>
            </div>
            <div className="flex flex-col gap-2 text-[#B4B0AE] mt-5">
                <p>Features</p>
                <span className="flex gap-2 mt-3 items-center">
                    <Check />1 Group
                </span>
                <span className="flex gap-2 items-center">
                    <Check />
                    Anytime Access
                </span>
                <span className="flex gap-2 items-center">
                    <Check />
                    Unlimited Channels
                </span>
                <span className="flex gap-2 items-center">
                    <Check />
                    Payment option
                </span>
                <span className="flex gap-2 items-center">
                    <Check />
                    24/7 Support
                </span>
                <span className="flex gap-2 items-center">
                    <Check />
                    Custom Domain
                </span>
            </div>
        </Card>
    </div>
  )
}