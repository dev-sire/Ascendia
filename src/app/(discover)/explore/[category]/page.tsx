import { onGetExploreGroup } from "@/actions/groups"
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query"
import ExplorePageContent from "../_components/explore-content"

const ExploreCategoryPage = async ({
  params,
}: {
  params: Promise<{ category: string }>
}) => {
  const { category } = await params
  const query = new QueryClient()

  await query.prefetchQuery({
    queryKey: ["groups"],
    queryFn: () => onGetExploreGroup(category, 0),
  })

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <ExplorePageContent layout="LIST" category={category} />
    </HydrationBoundary>
  )
}

export default ExploreCategoryPage