import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type ChatMessage = {
  id: string
  message: string
  createdAt: Date
  senderid: string | null
  recieverId: string | null
}

type InitialStateProps = {
  chat: ChatMessage[]
}

const InitialState: InitialStateProps = {
  chat: [],
}

export const onChats = createSlice({
  name: "chats",
  initialState: InitialState,
  reducers: {
    onChat: (state, action: PayloadAction<InitialStateProps>) => {
      const existingIds = new Set(state.chat.map((m) => m.id))
      const newMessages = action.payload.chat.filter(
        (m) => !existingIds.has(m.id),
      )
      if (newMessages.length > 0) {
        state.chat = [...state.chat, ...newMessages]
      }
    },
    onClearChat: (state) => {
      state.chat = []
    },
  },
})

export const { onChat, onClearChat } = onChats.actions
export default onChats.reducer