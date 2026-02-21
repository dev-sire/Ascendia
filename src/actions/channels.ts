'use server'

import { client } from "@/lib/prisma"
import { onAuthenticatedUser } from "./auth"

export const onGetChannelInfo = async (channelid: string) => {
    try {
        const user = await onAuthenticatedUser()
        const channel = await client.channel.findUnique({
            where: {
                id: channelid
            },
            include: {
                posts: {
                    take: 3,
                    orderBy: {
                        createdAt: "desc"
                    },
                    include: {
                        channel: {
                            select: {
                                name: true,
                            },
                        },
                        author: {
                            select: {
                                firstname: true,
                                lastname: true,
                                image: true,
                            },
                        },
                        _count: {
                            select: {
                                likes: true,
                                comments: true,
                            },
                        },
                        likes: {
                            where: {
                                userId: user.id!,
                            },
                            select: {
                                userId: true,
                                id: true,
                            }
                        }
                    }
                }
            }
        })
        return channel
    } catch (error) {
        return { status: 400, message: "Oops! something went wrong" }
    }
}