import { onGetGroupInfo, onSearchGroups } from "@/actions/groups"
import { GroupSettingsSchema } from "@/components/forms/group-settings/schema"
import { supabaseClient } from "@/lib/utils"
import { onOnline } from "@/redux/slices/online-member-slice"
import { onClearSearch, onSearch } from "@/redux/slices/search-slice"
import { AppDispatch } from "@/redux/store"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQuery } from "@tanstack/react-query"
import { JSONContent } from "novel"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { z } from "zod"

export const useGroupChatOnline = (userid: string) => {
    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        const channel = supabaseClient.channel("tracking")
        
        channel.on("presence", { event: "sync" }, () => {
            const state: any = channel.presenceState()
            console.log(state)
            for (const user in state){
                dispatch(
                    onOnline({
                        members: [{ id: state[user][0].member.userid }]
                    }),
                )
            }
        })
        .subscribe(async (status) => {
            if(status === "SUBSCRIBED"){
                await channel.track({
                    member: {
                        userid,
                    }
                })
            }
        })
        return () => {
            channel.unsubscribe()
        }
    })
}

export const useSearch = (search: "GROUPS" | "POSTS") => {

    const [query, setQuery] = useState<string>("")
    const [debounce, setDebounce] = useState<string>("")

    const dispatch: AppDispatch = useDispatch()

    const onSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) =>
        setQuery(e.target.value)

    useEffect(() => {
        const delayInputTimeoutId = setTimeout(() => {
            setDebounce(query)
        }, 1000)
        return () => clearTimeout(delayInputTimeoutId)
    }, [query, 1000])

    const { refetch, data, isFetched, isFetching } = useQuery({
        queryKey: ["search-data", debounce],
        queryFn: async ({ queryKey }) => {
            if(search === "GROUPS"){
                const groups = await onSearchGroups(search, queryKey[1])
                return groups
            }
        },
        enabled: false,
    })

    if (isFetching)
        dispatch(
            onSearch({
                isSearching: true,
                data: [],
            }),
        )

    if (isFetched)
        dispatch(
            onSearch({
                isSearching: false,
                status: data?.status as number,
                data: data?.groups || [],
                debounce,
            }),
        )

    useEffect(() => {
        if (debounce) refetch()
        if (!debounce) dispatch(onClearSearch())
        return () => {
            debounce
        }
    }, [debounce])

    return { query, onSearchQuery }

}

export const useGroupSettings = (groupid: string) => {
    const { data } = useQuery({
        queryKey: ["group-info"],
        queryFn: () => onGetGroupInfo(groupid),
    })

    const jsonContent = data?.group?.description !== null ? JSON.parse(data?.group?.jsonDescription as string) : undefined
    const [onJsonDescription, setJsonDescription] = useState<JSONContent | undefined>(jsonContent)
    const [onDescription, setOnDescription] = useState<string | undefined>(data?.group?.description || undefined)
    const {
        register,
        formState: { errors },
        reset,
        handleSubmit,
        watch,
        setValue,
    } = useForm<z.infer<typeof GroupSettingsSchema>>({
        resolver: zodResolver(GroupSettingsSchema),
        mode: "onChange",
    })
    const [previewIcon, setPreviewIcon] = useState<string | undefined>(undefined)
    const [previewThumbnail, setPreviewThumbnail] = useState<string | undefined>(undefined)

    // implement use effect and rest of the logic tomorrow
}