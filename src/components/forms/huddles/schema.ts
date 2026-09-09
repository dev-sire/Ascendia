import { z } from "zod"

export const SendNewMessageSchema = z.object({
  message: z.string().optional(),
})
