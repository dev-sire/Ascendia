"use server"
import { createGroupSchema } from "@/components/forms/create-group/schema";
import { client } from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";
import z from "zod";
import { onAuthenticatedUser } from "./auth";

export const onGetAffiliateInfo = async (id: string) => {
    try {
        const affiliateInfo = await client.affiliate.findUnique({
            where: {
                id
            },
            select: {
                Group: {
                    select: {
                        User: {
                            select: {
                                firstname: true,
                                lastname: true,
                                image: true,
                                id: true,
                                stripeId: true,
                            }
                        }
                    }
                }
            }
        })
        if(affiliateInfo){
            return { status: 200, user: affiliateInfo }
        }
        return { status: 404 }
    } catch (error) {
        return { status: 400 }
    }
}

export const onCreateNewGroup = async (
    userId: string,
    data: z.infer<typeof createGroupSchema>,
) => {
    try {
        const created = await client.user.update({
            where: {
                id: userId,
            },
            data: {
                group: {
                    create: {
                        ...data,
                        affiliate: {
                            create: {},
                        },
                        member: {
                            create: {
                                userId: userId,
                            },
                        },
                        channel: {
                            create: [
                                {
                                    id: uuidv4(),
                                    name: "general",
                                    icon: "general",
                                },
                                {
                                    id: uuidv4(),
                                    name: "announcements",
                                    icon: "announcement",
                                },
                            ],
                        },
                    },
                },
            },
            select: {
                id: true,
                group: {
                    select: {
                        id: true,
                        channel: {
                            select: {
                                id: true,
                            },
                            take: 1,
                            orderBy: {
                                createdAt: "asc",
                            },
                        },
                    },
                },
            },
        })

        if (created) {
            return {
                status: 200,
                data: created,
                message: "Group created successfully",
            }
        }
    } catch (error) {
        console.log(error)
        return {
            status: 400,
            message: `Oops! group creation failed, try again later ${error}`,
        }
    }
}

export const onGetGroupInfo = async (groupid: string) => {
    try {
        const user = await onAuthenticatedUser()
        const group = await client.group.findUnique({
            where: {
                id: groupid,
            }
        })
    if(group){
        return {
            status: 200,
            group,
            groupOwner: user.id === group.userId ? true : false,
        }
    }
    return { status: 404 }
    } catch (error) {
        return { status: 400 }
    }
}

export const onGetUserGroups = async (id: string) => {
    try {
        const groups = await client.user.findUnique({
            where: {
                id
            },
            select: {
                group: {
                    select: {
                        id: true,
                        name: true,
                        icon: true,
                        channel: {
                            where: {
                                name: "general"
                            },
                            select: {
                                id: true,
                            },
                        },
                    },
                },
                membership: {
                    select: {
                        Group: {
                            select: {
                                id: true,
                                icon: true,
                                name: true,
                                channel: {
                                    where: {
                                        name: "general"
                                    },
                                    select: {
                                        id: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        })

        if(groups && (groups.group.length > 0 || groups.membership.length > 0)){
            return {
                status: 200,
                groups: groups.group,
                members: groups.membership,
            }
        }
        return { status: 404 }
  
    } catch (error) {
        return { status: 400 }
    }
}

export const onGetGroupChannels = async (groupid: string) => {
    try {
        const channels = await client.channel.findMany({
            where: {
                groupId: groupid,
            },
            orderBy: {
                createdAt: "asc"
            }
        })
        return { status: 200, channels }
    } catch (error) {
        return { status: 400, message: "Oops! Something went wrong" }
    }
}

export const onGetGroupSubscriptions = async (groupid: string) => {
    try {
        const subscriptions = await client.subscription.findMany({
            where: {
                groupId: groupid,
            },
            orderBy: {
                createdAt: "desc",
            },
        })
        const count = await client.subscription.count({
            where: {
                groupId: groupid,
            },
        })

        if(subscriptions){
            return { status: 200, subscriptions, count }
        }

    } catch (error) {
        return { status: 400 }
    }
}

export const onGetAllGroupMembers = async (groupid: string) => {
    try {
        const user = await onAuthenticatedUser()
        const members = await client.members.findMany({
            where: {
                groupId: groupid,
                NOT: {
                    userId: user.id,
                },
            },
            include: {
                User: true
            },
        })

        if(members && members.length > 0){
            return { status: 200, members }
        }

    } catch (error) {
        return { status: 400, message: "Oops! Something went wrong" }
    }
}