import { z } from 'zod'

export const zUser = z.object({
  uid: z.string(),
  identify: z.string().trim(),
  isManager: z.boolean().default(false),
})

export type User = z.infer<typeof zUser>

export const zSigninPayload = zUser.pick({
  identify: true,
})

export type SigninPayload = z.infer<typeof zSigninPayload>
