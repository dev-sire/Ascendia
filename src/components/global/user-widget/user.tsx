"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Logout, Settings } from "@/icons"
import { supabaseClient } from "@/lib/utils"
import { onOffline } from "@/redux/slices/online-member-slice"
import { AppDispatch } from "@/redux/store"
import { useClerk } from "@clerk/nextjs"
import Link from "next/link"
import { useDispatch } from "react-redux"
import DropDown from "../drop-down"

type UserWidgetProps = {
    image: string
    groupId?: string
    userid?: string
}

export const UserAvatar = ({ image, groupId, userid }: UserWidgetProps) => {
    const { signOut } = useClerk()

    const untrackPresence = async () => {
        await supabaseClient.channel("tracking").untrack()
    }

    const dispatch: AppDispatch = useDispatch()

    const onLogout = async () => {
        untrackPresence()
        dispatch(onOffline({ members: [{ id: userid! }] }))
        signOut({ redirectUrl: "/" })
    }

    return (
        <DropDown
            title="Account"
            trigger={
                <Avatar className="cursor-pointer">
                    <AvatarImage src={image} alt="user" />
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>
            }
        >
            <Button
                variant="ghost"
                className="flex gap-x-3 px-2  hover:text-black  justify-start w-full"
            >
                <Link
                    href={`/group/${groupId}/settings`}
                    className="flex gap-2 "
                >
                    <Settings /> Settings
                </Link>
            </Button>
            <Button
                onClick={onLogout}
                variant="ghost"
                className="flex gap-x-3 px-2  hover:text-black  justify-start w-full"
            >
                <Logout />
                Logout
            </Button>
        </DropDown>
    )
}
