import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRef, useState } from "react"
import { toast } from "sonner"

export const useChannelInfo = () => {
    const channelRef = useRef<HTMLAnchorElement | null>(null)
    const inputref = useRef<HTMLInputElement | null>(null)
    const triggerRef = useRef<HTMLButtonElement | null>(null)
    const [channel, setChannel] = useState<string | undefined>(undefined)
    const [edit, setEdit] = useState<boolean>(false)
    const [icon, setIcon] = useState<string | undefined>(undefined)
    const client = useQueryClient()

    const onEditChannel = (id: string | undefined) => {
        setChannel(id)
        setEdit(true)
    }

    const onSetIcon = (icon: string | undefined) => setIcon(icon)

    const { isPending, mutate, variables } = useMutation({
        mutationFn: (data: { name?: string; icon?: string }) =>
            useChannelInfo(channel!, data.name, data.icon),
        onMutate: () => {
            setEdit(false)
            onSetIcon(undefined)
        },
        onSuccess: (data) => {
            return toast(data.status != 200 ? "Error" : "Success", {
                description: data.message
            })
        },
        onSettled: async () => {
            return await client.invalidateQueries({
                queryKey: ["group-channels"]
            })
        }
    })
}