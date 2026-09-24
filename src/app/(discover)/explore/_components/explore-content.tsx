"use client"
import { useAppSelector } from "@/redux/store"
import dynamic from "next/dynamic"
import GroupList from "./group-list"

type Props = {
  layout: "LIST"
  category?: string
}

const SearchGroups = dynamic(
  () =>
    import("./searched-groups").then((components) => components.SearchGroups),
  {
    ssr: false,
  },
)

const ExplorePageContent = ({ layout, category }: Props) => {
  const { isSearching, data, status, debounce } = useAppSelector(
    (state: any) => state.searchReducer,
  )

  return (
    <div className="flex flex-col">
      {isSearching || debounce ? (
        <SearchGroups
          searching={isSearching as boolean}
          data={data!}
          query={debounce}
        />
      ) : (
        <GroupList category={category as string} />
      )}
    </div>
  )
}

export default ExplorePageContent
