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
    

    return (
        <div>SidebarMenu</div>
    )
}

export default SidebarMenu