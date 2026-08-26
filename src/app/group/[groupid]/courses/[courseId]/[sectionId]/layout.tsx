import { onGetSectionInfo } from "@/actions/courses"
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query"
import SectionNavBar from "./_components/section-navbar"

type CourseContentPageLayout = {
  children: React.ReactNode
  params: Promise<{ sectionid: string }>
}

const CourseContentPageLayout = async ({
  children,
  params,
}: CourseContentPageLayout) => {
  const { sectionid } = await params
  const client = new QueryClient()

  // Key must include sectionid to match useSectionNavBar — without it
  // hydrated data from section A is served when navigating to section B.
  await client.prefetchQuery({
    queryKey: ["section-info", sectionid],
    queryFn: () => onGetSectionInfo(sectionid),
  })

  return (
    <HydrationBoundary state={dehydrate(client)}>
      <SectionNavBar sectionid={sectionid} />
      {children}
    </HydrationBoundary>
  )
}

export default CourseContentPageLayout
