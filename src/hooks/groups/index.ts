"use client"
import {
  onAddCustomDomain,
  onGetAllGroupMembers,
  onGetAllUserMessages,
  onGetDomainConfig,
  onGetExploreGroup,
  onGetGroupInfo,
  onGetGroupLeaderboard,
  onSearchGroups,
  onSendMessage,
  onUpdateGroupGallery,
  onUpDateGroupSettings,
} from "@/actions/groups"
import { AddCustomDomainSchema } from "@/components/forms/domain/schema"
import { GroupSettingsSchema } from "@/components/forms/group-settings/schema"
import { SendNewMessageSchema } from "@/components/forms/huddles/schema"
import { UpdateGallerySchema } from "@/components/forms/media-gallery/schema"
import { upload } from "@/lib/uploadcare"
import { supabaseClient, validateURLString } from "@/lib/utils"
import {
  onClearList,
  onInfiniteScroll,
} from "@/redux/slices/infinite-scroll-slice"
import { onOnline } from "@/redux/slices/online-member-slice"
import {
  GroupStateProps,
  onClearSearch,
  onSearch,
} from "@/redux/slices/search-slice"
import { AppDispatch } from "@/redux/store"
import { useUser as useClerkUser } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { usePathname, useRouter } from "next/navigation"
import { JSONContent } from "novel"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { toast } from "sonner"
import { v4 } from "uuid"
import { z } from "zod"

export const useGroupChatOnline = (userid: string) => {
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    const channel = supabaseClient.channel("tracking")

    channel
      .on("presence", { event: "sync" }, () => {
        const state: any = channel.presenceState()
        console.log(state)
        for (const user in state) {
          dispatch(
            onOnline({
              members: [{ id: state[user][0].member.userid }],
            }),
          )
        }
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await channel.track({
            member: {
              userid,
            },
          })
        }
      })

    return () => {
      channel.unsubscribe()
    }
  }, [])
}

export const useSearch = (search: "GROUPS" | "POSTS") => {
  const [query, setQuery] = useState<string>("")
  const [debounce, setDebounce] = useState<string>("")

  const dispatch: AppDispatch = useDispatch()

  const onSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) =>
    setQuery(e.target.value)

  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      setDebounce(query)
    }, 1000)
    return () => clearTimeout(delayInputTimeoutId)
  }, [query, 1000])

  const { refetch, data, isFetched, isFetching } = useQuery({
    queryKey: ["search-data", debounce],
    queryFn: async ({ queryKey }) => {
      if (search === "GROUPS") {
        const groups = await onSearchGroups(search, queryKey[1])
        return groups
      }
    },
    enabled: false,
  })

  if (isFetching)
    dispatch(
      onSearch({
        isSearching: true,
        data: [],
      }),
    )

  if (isFetched)
    dispatch(
      onSearch({
        isSearching: false,
        status: data?.status as number,
        data: data?.groups || [],
        debounce,
      }),
    )

  useEffect(() => {
    if (debounce) refetch()
    if (!debounce) dispatch(onClearSearch())
    return () => {
      debounce
    }
  }, [debounce])

  return { query, onSearchQuery }
}

export const useGroupSettings = (groupid: string) => {
  const { data } = useQuery({
    queryKey: ["group-info", groupid],
    queryFn: () => onGetGroupInfo(groupid),
  })

  const jsonContent = data?.group?.jsonDescription
    ? JSON.parse(data?.group?.jsonDescription as string)
    : undefined

  const [onJsonDescription, setJsonDescription] = useState<
    JSONContent | undefined
  >(jsonContent)

  const [onDescription, setOnDescription] = useState<string | undefined>(
    data?.group?.description || undefined,
  )

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    watch,
    setValue,
  } = useForm<z.infer<typeof GroupSettingsSchema>>({
    resolver: zodResolver(GroupSettingsSchema),
    mode: "onChange",
  })
  const [previewIcon, setPreviewIcon] = useState<string | undefined>(undefined)
  const [previewThumbnail, setPreviewThumbnail] = useState<string | undefined>(
    undefined,
  )

  useEffect(() => {
    const previews: any = watch(({ thumbnail, icon }: any) => {
      if (!icon) return
      if (icon[0]) {
        setPreviewIcon(URL.createObjectURL(icon[0]))
      }
      if (thumbnail[0]) {
        setPreviewThumbnail(URL.createObjectURL(thumbnail[0]))
      }
    })
    return () => previews.unsubscribe()
  }, [watch])

  const onSetDescriptions = () => {
    const JsonContent = JSON.stringify(onJsonDescription)
    setValue("jsondescription", JsonContent)
    setValue("description", onDescription)
  }

  useEffect(() => {
    onSetDescriptions()
    return () => {
      onSetDescriptions()
    }
  }, [onJsonDescription, onDescription])

  const { mutate: update, isPending } = useMutation({
    mutationKey: ["group-settings"],
    mutationFn: async (values: z.infer<typeof GroupSettingsSchema>) => {
      if (values.thumbnail && values.thumbnail.length > 0) {
        const uploaded = await upload.uploadFile(values.thumbnail[0])
        const updated = await onUpDateGroupSettings(
          groupid,
          "IMAGE",
          uploaded.uuid,
          `/group/${groupid}/settings`,
        )
        if (updated.status !== 200) {
          return toast("Error", {
            description: "Oops! looks like your form is empty",
          })
        }
      }
      if (values.icon && values.icon.length > 0) {
        console.log("icon")
        const uploaded = await upload.uploadFile(values.icon[0])
        const updated = await onUpDateGroupSettings(
          groupid,
          "ICON",
          uploaded.uuid,
          `/group/${groupid}/settings`,
        )
        if (updated.status !== 200) {
          return toast("Error", {
            description: "Oops! looks like your form is empty",
          })
        }
      }
      if (values.name) {
        const updated = await onUpDateGroupSettings(
          groupid,
          "NAME",
          values.name,
          `/group/${groupid}/settings`,
        )
        if (updated.status !== 200) {
          return toast("Error", {
            description: "Oops! looks like your form is empty",
          })
        }
      }
      console.log("DESCRIPTION")

      if (values.description) {
        const updated = await onUpDateGroupSettings(
          groupid,
          "DESCRIPTION",
          values.description,
          `/group/${groupid}/settings`,
        )
        if (updated.status !== 200) {
          return toast("Error", {
            description: "Oops! looks like your form is empty",
          })
        }
      }
      if (values.jsondescription) {
        const updated = await onUpDateGroupSettings(
          groupid,
          "JSONDESCRIPTION",
          values.jsondescription,
          `/group/${groupid}/settings`,
        )
        if (updated.status !== 200) {
          return toast("Error", {
            description: "Oops! looks like your form is empty",
          })
        }
      }
      if (
        !values.description &&
        !values.name &&
        !values.thumbnail.length &&
        !values.icon.length &&
        !values.jsondescription
      ) {
        return toast("Error", {
          description: "Oops! looks like your form is empty",
        })
      }
      return toast("Success", {
        description: "Group data updated",
      })
    },
  })
  const router = useRouter()
  const onUpdate = handleSubmit(async (values) => update(values))
  if (data?.status !== 200) router.push(`/group/create`)

  return {
    data,
    register,
    errors,
    onUpdate,
    isPending,
    previewIcon,
    previewThumbnail,
    onJsonDescription,
    setJsonDescription,
    setOnDescription,
    onDescription,
  }
}
export const useGroupList = (query: string) => {
  const { data } = useQuery({
    queryKey: [query],
  })

  const dispatch: AppDispatch = useDispatch()

  useLayoutEffect(() => {
    dispatch(onClearList({ data: [] }))
  }, [])

  const { groups, status } = data as {
    groups: GroupStateProps[]
    status: number
  }

  return { groups, status }
}

export const useExploreSlider = (query: string, paginate: number) => {
  const [onLoadSlider, setOnLoadSlider] = useState<boolean>(false)
  const dispatch: AppDispatch = useDispatch()
  const { data, refetch, isFetching, isFetched } = useQuery({
    queryKey: ["fetch-group-slides"],
    queryFn: () => onGetExploreGroup(query, paginate | 0),
    enabled: false,
  })

  if (isFetched && data?.status === 200 && data.groups) {
    dispatch(onInfiniteScroll({ data: data.groups }))
  }

  useEffect(() => {
    setOnLoadSlider(true)
    return () => {
      onLoadSlider
    }
  }, [])

  return { refetch, isFetching, data, onLoadSlider }
}

export const useGroupInfo = () => {
  const pathname = usePathname()
  // Extract groupid from URL: /group/[groupid]/...
  const groupid = pathname.split("/")[2]

  const { data, isPending } = useQuery({
    queryKey: ["about-group-info"],
    queryFn: () => onGetGroupInfo(groupid),
    enabled: Boolean(groupid),
    // Don't auto-refetch on window focus — widget doesn't need live updates
    staleTime: 1000 * 60 * 5,
  })

  const router = useRouter()

  // Still fetching — return loading state, never redirect
  if (isPending || data === undefined) {
    return { group: undefined, loading: true }
  }

  const { group, status } = data as { status: number; group: GroupStateProps }

  console.log(data)

  // Data came back but the group doesn't exist
  // if (status !== 200) {
  //   router.push("/explore")
  //   return { group: undefined, loading: false }
  // }

  return { group, loading: false }
}

export const useGroupAbout = (
  description: string | null,
  jsonDescription: string | null,
  htmlDescription: string | null,
  currentMedia: string,
  groupid: string,
) => {
  const editor = useRef<HTMLFormElement | null>(null)
  const mediaType = validateURLString(currentMedia)
  const [activeMedia, setActiveMedia] = useState<
    | {
        url: string | undefined
        type: string
      }
    | undefined
  >(
    mediaType.type === "IMAGE"
      ? {
          url: currentMedia,
          type: mediaType.type,
        }
      : { ...mediaType },
  )

  const jsonContent =
    jsonDescription !== null ? JSON.parse(jsonDescription as string) : undefined

  const [onJsonDescription, setJsonDescription] = useState<
    JSONContent | undefined
  >(jsonContent)

  const [onDescription, setOnDescription] = useState<string | undefined>(
    description || undefined,
  )

  const [onHtmlDescription, setOnHtmlDescription] = useState<
    string | undefined
  >(htmlDescription || undefined)

  const [onEditDescription, setOnEditDescription] = useState<boolean>(false)

  const {
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<z.infer<typeof GroupSettingsSchema>>({
    resolver: zodResolver(GroupSettingsSchema),
  })

  const onSetDescriptions = () => {
    const JsonContent = JSON.stringify(onJsonDescription)
    setValue("jsondescription", JsonContent)
    setValue("description", onDescription)
    setValue("htmldescription", onHtmlDescription)
  }

  useEffect(() => {
    onSetDescriptions()
    return () => {
      onSetDescriptions()
    }
  }, [onJsonDescription, onDescription])

  const onEditTextEditor = (event: Event) => {
    if (editor.current) {
      !editor.current.contains(event.target as Node | null)
        ? setOnEditDescription(false)
        : setOnEditDescription(true)
    }
  }

  useEffect(() => {
    document.addEventListener("click", onEditTextEditor, false)
    return () => {
      document.removeEventListener("click", onEditTextEditor, false)
    }
  }, [])

  const { mutate, isPending } = useMutation({
    mutationKey: ["about-description"],
    mutationFn: async (values: z.infer<typeof GroupSettingsSchema>) => {
      if (values.description) {
        const updated = await onUpDateGroupSettings(
          groupid,
          "DESCRIPTION",
          values.description,
          `/about/${groupid}`,
        )
        if (updated.status !== 200) {
          return toast("Error", {
            description: "Oops! looks like your form is empty",
          })
        }
      }
      if (values.jsondescription) {
        const updated = await onUpDateGroupSettings(
          groupid,
          "JSONDESCRIPTION",
          values.jsondescription,
          `/about/${groupid}`,
        )
        if (updated.status !== 200) {
          return toast("Error", {
            description: "Oops! looks like your form is empty",
          })
        }
      }
      if (values.htmldescription) {
        const updated = await onUpDateGroupSettings(
          groupid,
          "HTMLDESCRIPTION",
          values.htmldescription,
          `/about/${groupid}`,
        )
        if (updated.status !== 200) {
          return toast("Error", {
            description: "Oops! looks like your form is empty",
          })
        }
      }
      if (
        !values.description &&
        !values.jsondescription &&
        !values.htmldescription
      ) {
        return toast("Error", {
          description: "Oops! looks like your form is empty",
        })
      }
      return toast("Success", {
        description: "Group description updated",
      })
    },
  })
  const onSetActiveMedia = (media: { url: string | undefined; type: string }) =>
    setActiveMedia(media)

  const onUpdateDescription = handleSubmit(async (values) => {
    mutate(values)
  })

  return {
    setOnDescription,
    onDescription,
    setJsonDescription,
    onJsonDescription,
    errors,
    onEditDescription,
    editor,
    activeMedia,
    onSetActiveMedia,
    setOnHtmlDescription,
    onUpdateDescription,
    isPending,
  }
}

export const useMediaGallery = (groupid: string) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<z.infer<typeof UpdateGallerySchema>>({
    resolver: zodResolver(UpdateGallerySchema),
  })

  const { mutate, isPending } = useMutation({
    mutationKey: ["update-gallery"],
    mutationFn: async (values: z.infer<typeof UpdateGallerySchema>) => {
      if (values.videourl) {
        const update = await onUpdateGroupGallery(groupid, values.videourl)
        if (update && update.status !== 200) {
          return toast("Error", {
            description: update?.message,
          })
        }
      }
      if (values.image && values.image.length) {
        let count = 0
        while (count < values.image.length) {
          const uploaded = await upload.uploadFile(values.image[count])
          if (uploaded) {
            const update = await onUpdateGroupGallery(groupid, uploaded.uuid)
            if (update?.status !== 200) {
              toast("Error", {
                description: update?.message,
              })
              break
            }
          } else {
            toast("Error", {
              description: "Looks like something went wrong!",
            })
            break
          }
          console.log("increment")
          count++
        }
      }

      return toast("Success", {
        description: "Group gallery updated",
      })
    },
  })

  const onUpdateGallery = handleSubmit(async (values) => mutate(values))

  return {
    register,
    errors,
    onUpdateGallery,
    isPending,
  }
}

export const useGroupChat = (groupid: string) => {
  const { data } = useQuery({
    queryKey: ["member-chats", groupid],
    queryFn: () => onGetAllGroupMembers(groupid),
    enabled: Boolean(groupid) && groupid.length === 36,
    staleTime: 1000 * 60 * 2,
  })

  return { data }
}

export const useChatWindow = (recieverid: string) => {
  const { user } = useClerkUser()
  const queryClient = useQueryClient()
  const messageWindowRef = useRef<HTMLDivElement | null>(null)

  const { data } = useQuery({
    queryKey: ["user-messages", recieverid],
    queryFn: () => onGetAllUserMessages(recieverid),
    enabled: Boolean(recieverid) && recieverid.length === 36,
    staleTime: 1000 * 30,
  })

  console.log(data, "data in chat window")

  const messages = data?.messages ?? []

  // Supabase Realtime — listen for messages where current user is the RECEIVER
  // This fires on the recipient's browser when someone sends them a message.
  useEffect(() => {
    if (!recieverid || !user?.id) return

    const channelName = `messages-to-${user.id}-from-${recieverid}`

    const channel = supabaseClient
      .channel(channelName)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "Message",
          // Filter: messages sent TO the current user (they are the receiver)
          filter: `recieverId=eq.${user.id}`,
        },
        (payload) => {
          const newMsg = payload.new as {
            id: string
            message: string | null
            mediaUrl: string | null
            mediaType: "IMAGE" | "AUDIO" | null
            createdAt: string
            senderid: string | null
            recieverId: string | null
          }

          // Only add if it's from the person we're currently chatting with
          if (newMsg.senderid !== recieverid) return

          queryClient.setQueryData(
            ["user-messages", recieverid],
            (old: any) => {
              const existing = old?.messages ?? []
              // Deduplicate by ID
              if (existing.find((m: any) => m.id === newMsg.id)) return old
              return {
                ...old,
                messages: [
                  ...existing,
                  {
                    ...newMsg,
                    createdAt: new Date(newMsg.createdAt),
                    mediaUrl: newMsg.mediaUrl ?? null,
                    mediaType: newMsg.mediaType ?? null,
                  },
                ],
              }
            },
          )
        },
      )
      .subscribe()

    return () => {
      supabaseClient.removeChannel(channel)
    }
  }, [recieverid, user?.id, queryClient])

  // Scroll to bottom whenever messages grow
  useEffect(() => {
    if (messageWindowRef.current) {
      messageWindowRef.current.scrollTop =
        messageWindowRef.current.scrollHeight
    }
  }, [messages.length])

  return { messageWindowRef, messages }
}

type OutgoingMessage = {
  messageid: string
  message?: string
  mediaUrl?: string
  mediaType?: "IMAGE" | "AUDIO"
  // blob URL for optimistic render only — never sent to server
  localBlobUrl?: string
}

export const useSendMessage = (recieverId: string, userid: string) => {
  const queryClient = useQueryClient()
  const { register, reset, handleSubmit } = useForm<
    z.infer<typeof SendNewMessageSchema>
  >({
    resolver: zodResolver(SendNewMessageSchema),
  })

  // ── Image state ──
  const [pendingImage, setPendingImage] = useState<File | null>(null)
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null)
  const imageInputRef = useRef<HTMLInputElement | null>(null)

  // ── Audio recording state ──
  const [isRecording, setIsRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [audioBlobUrl, setAudioBlobUrl] = useState<string | null>(null)
  const [recordingSeconds, setRecordingSeconds] = useState(0)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const clearImage = () => {
    setPendingImage(null)
    if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl)
    setImagePreviewUrl(null)
    if (imageInputRef.current) imageInputRef.current.value = ""
  }

  const clearAudio = () => {
    setAudioBlob(null)
    if (audioBlobUrl) URL.revokeObjectURL(audioBlobUrl)
    setAudioBlobUrl(null)
    setRecordingSeconds(0)
  }

  const onPickImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    clearAudio()
    setPendingImage(file)
    setImagePreviewUrl(URL.createObjectURL(file))
  }

  const onStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)
      audioChunksRef.current = []
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data)
      }
      recorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" })
        const url = URL.createObjectURL(blob)
        setAudioBlob(blob)
        setAudioBlobUrl(url)
        stream.getTracks().forEach((t) => t.stop())
      }
      recorder.start()
      mediaRecorderRef.current = recorder
      setIsRecording(true)
      setRecordingSeconds(0)
      timerRef.current = setInterval(
        () => setRecordingSeconds((s) => s + 1),
        1000,
      )
    } catch {
      toast("Microphone access denied")
    }
  }

  const onStopRecording = () => {
    mediaRecorderRef.current?.stop()
    mediaRecorderRef.current = null
    setIsRecording(false)
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    clearImage()
  }

  const { mutate, isPending: isSending } = useMutation({
    mutationKey: ["send-new-message"],
    mutationFn: (data: OutgoingMessage) =>
      onSendMessage(
        recieverId,
        data.messageid,
        data.message,
        data.mediaUrl,
        data.mediaType,
      ),
    onMutate: (variables) => {
      reset()
      clearImage()
      clearAudio()
      const optimisticMsg = {
        id: variables.messageid,
        message: variables.message ?? null,
        mediaUrl: variables.localBlobUrl ?? variables.mediaUrl ?? null,
        mediaType: variables.mediaType ?? null,
        createdAt: new Date().toISOString(),
        senderid: userid,
        recieverId,
      }
      queryClient.setQueryData(["user-messages", recieverId], (old: any) => {
        const existing = old?.messages ?? []
        return { ...old, status: 200, messages: [...existing, optimisticMsg] }
      })
    },
    onError: (_err, variables) => {
      queryClient.setQueryData(["user-messages", recieverId], (old: any) => ({
        ...old,
        messages: (old?.messages ?? []).filter(
          (m: any) => m.id !== variables.messageid,
        ),
      }))
    },
  })

  const onSendNewMessage = handleSubmit(async (values) => {
    const text = values.message?.trim()

    // ── Audio send ──
    if (audioBlob) {
      const blobUrl = audioBlobUrl
      const file = new File([audioBlob], `audio-${Date.now()}.webm`, {
        type: "audio/webm",
      })
      const uploaded = await upload.uploadFile(file)
      mutate({
        messageid: v4(),
        mediaUrl: uploaded.uuid,
        mediaType: "AUDIO",
        localBlobUrl: blobUrl ?? undefined,
      })
      return
    }

    // ── Image send ──
    if (pendingImage) {
      const localUrl = imagePreviewUrl
      const uploaded = await upload.uploadFile(pendingImage)
      mutate({
        messageid: v4(),
        message: text || undefined,
        mediaUrl: uploaded.uuid,
        mediaType: "IMAGE",
        localBlobUrl: localUrl ?? undefined,
      })
      return
    }

    // ── Text only ──
    if (text) {
      mutate({ messageid: v4(), message: text })
    }
  })

  return {
    onSendNewMessage,
    register,
    isSending,
    // image
    pendingImage,
    imagePreviewUrl,
    imageInputRef,
    onPickImage,
    clearImage,
    // audio
    isRecording,
    audioBlob,
    audioBlobUrl,
    recordingSeconds,
    onStartRecording,
    onStopRecording,
    clearAudio,
  }
}

export const useCustomDomain = (groupid: string) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof AddCustomDomainSchema>>({
    resolver: zodResolver(AddCustomDomainSchema),
  })

  const client = useQueryClient()

  const { data } = useQuery({
    queryKey: ["domain-config"],
    queryFn: () => onGetDomainConfig(groupid),
  })

  const { mutate, isPending } = useMutation({
    mutationFn: (data: { domain: string }) =>
      onAddCustomDomain(groupid, data.domain),
    onMutate: reset,
    onSuccess: (data) => {
      return toast(data.status === 200 ? "Success" : "Error", {
        description: data.message,
      })
    },
    onSettled: async () => {
      return await client.invalidateQueries({
        queryKey: ["domain-config"],
      })
    },
  })

  const onAddDomain = handleSubmit(async (values) => mutate(values))

  return {
    onAddDomain,
    isPending,
    register,
    errors,
    data,
  }
}
export const useGroupLeaderboard = (groupid: string) => {
  const { data } = useQuery({
    queryKey: ["group-leaderboard", groupid],
    queryFn: () => onGetGroupLeaderboard(groupid),
  })

  return { leaderboard: data?.leaderboard ?? [] }
}