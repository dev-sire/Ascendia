import dynamic from "next/dynamic"
import CallToAction from "./_components/call-to-action"
import DashboardSnippet from "./_components/dashboard-snippet"
import { CourseSection, FinalCTA, Footer, GoldRule, GroupsSection } from "./_components/deep-features"

const PricingSection = dynamic(
  () =>
    import("./_components/pricing").then(
      (component) => component.PricingSection,
    ),
  { ssr: true },
)

export default function Home() {
  return (
    <main className="flex flex-col w-full">
      <CallToAction />
      <GoldRule />
      <div className="h-16" />
      <DashboardSnippet />
      <GoldRule />
      <PricingSection />
      <GoldRule />
      <GroupsSection />
      <GoldRule />
      <CourseSection />
      <GoldRule />
      <FinalCTA />
      <Footer />
    </main>
  )
}