import { onAuthenticatedUser } from '@/actions/auth';
import {
    onGetAllGroupMembers,
    onGetGroupChannels,
    onGetGroupInfo,
    onGetGroupSubscriptions,
    onGetUserGroups
} from '@/actions/groups';
import SideBar from '@/components/global/sidebar';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { redirect } from 'next/navigation';
import React from 'react';

type Props = { 
    children: React.ReactNode; 
    params: Promise<{ groupId: string }> 
}

const GroupLayout = async ({ children, params }: Props) => {

    const query = new QueryClient()
    const user = await onAuthenticatedUser()
    const { groupId } = await params;
    if(!user.id) redirect('/login')
    
    // group info
    await query.prefetchQuery({
        queryKey: ["group-info"],
        queryFn: () => onGetGroupInfo(groupId),
    })

    // user groups
    await query.prefetchQuery({
        queryKey: ["user-groups"],
        queryFn: () => onGetUserGroups(user.id as string)
    })

    // channels
    await query.prefetchQuery({
        queryKey: ["group-channels"],
        queryFn: () => onGetGroupChannels(groupId)
    })

    // group subscriptions
    await query.prefetchQuery({
        queryKey: ["group-subscriptions"],
        queryFn: () => onGetGroupSubscriptions(groupId),
    })

    // Members Chats
    await query.prefetchQuery({
        queryKey: ["group-members"],
        queryFn: () => onGetAllGroupMembers(groupId)
    })

    return (
        <HydrationBoundary state={dehydrate(query)}>
            <div className="flex h-screen md:pt-5">
                <SideBar groupid={groupId} userid={user.id} />
            </div>
        </HydrationBoundary>
    )
}

export default GroupLayout