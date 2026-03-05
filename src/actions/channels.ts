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

export const onCreateNewChannel = async (
    groupid: string,
    data: {
        id: string,
        name: string,
        icon: string,
    }
) => {
    try {
        const channel = await client.group.update({
            where: {
                id: groupid
            },
            data: {
                channel: {
                    create: {
                        ...data,
                    },
                },
            },
            select: {
                channel: true,
            },
        })

        if(channel){
            return { status: 200, channel: channel.channel }
        }

        return {
            status: 404,
            message: "Channel could not be created."
        }

    } catch (error) {
        return {
            status: 400,
            message: "Oops! something went wrong."
        }
    }
}

export const onUpdatedChannelInfo = async (
    channelid: string,
    name?: string,
    icon?: string,
) => {
    try {
        if (name){
            // console.log(name, channelid)
            const channel = await client.channel.update({
                where: {
                    id: channelid,
                },
                data: {
                    name,
                },
            })

            if (channel) {
                return {
                    status: 200,
                    message: "Channel name updated successfully",
                }
            }
            
            return {
                status: 404,
                message: "Channel not found! Try again later."
            }
        }

        if (icon) {
            const channel = await client.channel.update({
                where: {
                    id: channelid,
                },
                data: {
                    icon,
                }
            })

            if (channel){
                return {
                    status: 200,
                    message: "Channel icon updated successfully",
                }
            }

            return {
                status: 404,
                message: "Channel not found! Try again later."
            }
        } else {
            const channel = await client.channel.update({
                where: {
                    id: channelid,
                },
                data: {
                    name,
                    icon
                }
            })

            if (channel){
                return {
                    status: 200,
                    message: "Channel updated successfully"
                }
            }
            
            return {
                status: 404,
                message: "Channel not found! Try again later."
            }
        }

    } catch (error) {
        console.log(error)
        return { status: 400, message: "Oops! Something went wrong." }
    }
}