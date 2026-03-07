import { onDeleteChannel, onUpdateChannelInfo } from "@/actions/channels"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useEffect, useRef, useState } from "react"
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
            onUpdateChannelInfo(channel!, data.name, data.icon),
        onMutate: () => {
            setEdit(false)
            onSetIcon(undefined)
        },
        onSuccess: (data) => {
            return toast(data.status !== 200 ? "Error" : "Success", {
                description: data.message,
            })
        },
        onSettled: async () => {
            return await client.invalidateQueries({
                queryKey: ["group-channels"],
            })
        },
    })

    const { variables: deleteVariables, mutate: deleteMutation } = useMutation({
        mutationFn: (data: { id: string }) => onDeleteChannel(data.id),
        onSuccess: (data) => {
            return toast(data.status !== 200 ? "Error" : "Success", {
                description: data.message
            })
        },
        onSettled: async () => {
            return await client.invalidateQueries({
                queryKey: ["group-channels"],
            })
        },
    })

    const onEndChannelEdit = (event: Event) => {
        if (inputref.current && channelRef.current && triggerRef.current){
            if(
                !inputref.current.contains(event.target as Node | null) &&
                !channelRef.current.contains(event.target as Node | null) &&
                !triggerRef.current.contains(event.target as Node | null) &&
                !document.getElementById("icon-list")
            ) {
                if (inputref.current.value){
                    mutate({
                        name: inputref.current.value,
                    })
                }
                if (icon){
                    mutate({ icon })
                } else {
                    setEdit(false)
                }
            }
        }
    }

    useEffect(() => {
        document.addEventListener("click", onEndChannelEdit, false)

        return () => {
            document.removeEventListener("click", onEndChannelEdit, false)
        }
    }, [icon])

    const onChannelDelete = (id: string) => deleteMutation({ id })
}