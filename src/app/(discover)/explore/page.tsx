import { onGetExploreGroup } from "@/actions/groups"
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query"
import ExplorePageContent from "./_components/explore-content"

const ExplorePage = async () => {
  const query = new QueryClient()

  await query.prefetchQuery({
    queryKey: ["groups"],
    queryFn: () => onGetExploreGroup("all", 0),
  })

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <ExplorePageContent layout="LIST" category="all" />
    </HydrationBoundary>
  )
}

export default ExplorePage
