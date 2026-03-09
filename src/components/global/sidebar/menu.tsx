import { SIDEBAR_SETTINGS_MENU } from '@/constants/menu';
import { useChannelInfo } from '@/hooks/channels';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IChannels } from '.';

type Props = {
    channels: IChannels[];
    optimisticChannel: {
        id: string;
        name: string;
        icon: string;
        createdAt: Date;
        groupId: string | null
    } | undefined
    loading: boolean;
    groupid: string;
    groupUserId: string;
    userId: string;
}

const SidebarMenu = ({
    channels,
    optimisticChannel,
    loading,
    groupid,
    groupUserId,
    userId
}: Props) => {

    const pathName = usePathname()
    const currentPage = pathName.split("/").pop()
    
    const {
        channel: current,
        onEditChannel,
        channelRef,
        inputRef,
        variables,
        isPending,
        edit,
        triggerRef,
        onSetIcon,
        icon,
        onChannelDelete,
        deleteVariables
    } = useChannelInfo()

    if(pathName.includes("settings")){
        return (
            <div className="flex flex-col">
                {SIDEBAR_SETTINGS_MENU.map((item) => 
                      item.integration ? (
                        userId === groupUserId && (
                            <Link
                                className={cn(
                                    "flex items-center gap-x-2 font-semibold rounded-xl text-themeTextGray hover:bg-themeGray p-2",
                                    currentPage === "settings"
                                        ? !item.path && "text-white"
                                        :  currentPage === item.path && "text-white"
                                )}
                                href={`/group/${groupid}/settings/${item.path}`}
                                key={item.id}
                            >
                                {item.icon}
                                {item.label}
                            </Link>
                        )
                      ) : (
                        <Link
                            className={cn(
                                "flex gap-x-2 items-center font-semibold rounded-xl text-themeTextGray hover:bg-themeGray p-2",
                                currentPage === "settings"
                                ? !item.path && "text-white"
                                : currentPage === item.path && "text-white",
                            )}
                            href={`/group/${groupid}/settings/${item.path}`}
                            key={item.id}
                        >
                            {item.icon}
                            {item.label}
                        </Link>
                      ) 
                )}
            </div>
        )
    }

    return (
        <div className='flex flex-col'>
            {channels && channels.length > 0 ? (<>
                {channels.map((channel) => 
                    channel.id !== deleteVariables?.id && (
                        <Link
                            id="channel-link"
                            key={channel.id}
                            className={cn(
                                "flex justify-between hover:bg-themeGray p-2 group rounded-lg items-center",
                                channel.id === current &&
                                edit &&
                                "bg-themeGray",
                            )}
                            href={`/group/${channel.groupId}/channel/${channel.id}`}
                            {...(channel.name !== "general" &&
                                channel.name !== "announcements" && {
                                    onDoubleClick: () =>
                                        onEditChannel(channel.id),
                                    ref: channelRef,
                            })}
                        >
                            continue
                        </Link>
                    ),
                )}
            </>) : (<>
            
            </>)
            }
        </div>
    )
}

export default SidebarMenu