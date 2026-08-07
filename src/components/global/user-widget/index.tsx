import { Message } from "@/icons"
import Link from "next/link"
import { Notification } from "./notification"
import { UserAvatar } from "./user"

type Props = {
    image: string
    groupId?: string
    userid?: string
}

const UserWidget = ({ userid, image, groupId }: Props) => {
    return (
        <div className="gap-5 items-center hidden md:flex">
            <Notification />
            <Link href={`/group/${groupId}/messages`}>
                <Message />
            </Link>
            <UserAvatar userid={userid} image={image} groupId={groupId} />
        </div>
    )
}

export default UserWidget
