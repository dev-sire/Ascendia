import BackdropGradient from "@/components/global/backdrop-gradient"
import GradientText from "@/components/global/gradient-text"

type Props = {}

export const PricingSection = (props: Props) => {
  return (
    <div 
        className='w-full pt-20 flex flex-col items-center gap-3'
        id="pricing"
    >
        <BackdropGradient className="w-8/12 h-full flex flex-col opacity-40 items-center">
            <GradientText
                className="text-4xl font-semibold text-center"
                element="H2"
            >
                Pricng Plans That Fit You Right
            </GradientText>
            <p className="text-sm md:text-center text-left text-muted-foreground">
                Ascendia is a vibrant online community that empowers people to connect, <br className='md:hidden' />{" "} collaborate, and cultivate meaningful <br className='md:hidden' /> relationships.
            </p>
        </BackdropGradient>
    </div>
  )
}