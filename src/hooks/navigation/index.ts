import { onCreateNewChannel } from "@/actions/channels"
import { onGetGroupChannels } from "@/actions/groups"
import { IGroupInfo, IGroups } from "@/components/global/sidebar"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

export const useNavigation = () => {
  const pathName = usePathname()
  const [section, setSection] = useState(pathName)
  const onSetSection = (page: string) => setSection(page)
  return {
    section,
    onSetSection,
  }
}

export const useSideBar = (groupid: string) => {
  // Keys must match the prefetch keys in group layout exactly,
  // including the groupid, so hydrated data is served correctly
  // and never bleeds between groups.
  const { data: groups } = useQuery({
    queryKey: ["user-groups"],
  }) as { data: IGroups }

  const { data: groupInfo } = useQuery({
    queryKey: ["group-info", groupid],
  }) as { data: IGroupInfo }

  const { data: channels } = useQuery({
    queryKey: ["group-channels", groupid],
    queryFn: () => onGetGroupChannels(groupid),
  })

  const client = useQueryClient()

  const { isPending, mutate, isError, variables } = useMutation({
    mutationFn: (data: {
      id: string
      name: string
      icon: string
      createdAt: Date
      groupId: string | null
    }) =>
      onCreateNewChannel(groupid, {
        id: data.id,
        name: data.name.toLowerCase(),
        icon: data.icon,
      }),
    onSettled: async () => {
      return await client.invalidateQueries({
        queryKey: ["group-channels", groupid],
      })
    },
  })

  if (isPending)
    toast("Success", {
      description: "Channel created",
    })

  if (isError)
    toast("Error", {
      description: "Oops! something went wrong",
    })

  return { groupInfo, groups, mutate, variables, isPending, channels }
}
