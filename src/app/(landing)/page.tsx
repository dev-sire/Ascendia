import CallToAction from "./_components/call-to-action"
import ConnectedServices from "./_components/connected-services"
import DashboardSnippet from "./_components/dashboard-snippet"
import {
  CourseSection,
  FinalCTA,
  Footer,
  GoldRule,
  GroupsSection,
} from "./_components/deep-features"
import LaunchVideo from "./_components/launch-video"
import { PricingSection } from "./_components/pricing"

/**
 * Story order: promise → demo video → how it connects → what you get → the deep dives →
 * the price → one last nudge.
 */
export default function Home() {
  return (
    <main className="flex w-full flex-col">
      <CallToAction />
      <LaunchVideo />
      <ConnectedServices />
      <GoldRule />
      <div className="h-16" />
      <DashboardSnippet />
      <GoldRule />
      <GroupsSection />
      <GoldRule />
      <CourseSection />
      <GoldRule />
      <PricingSection />
      <GoldRule />
      <FinalCTA />
      <Footer />
    </main>
  )
}
