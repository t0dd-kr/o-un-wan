import { z } from 'zod'

export const zComment = z.object({
  uid: z.string(),
  userUid: z.string(),
  postUid: z.string(),
  content: z.string(),
  createdAt: z.date(),
  identify: z.string().optional(),
})

export type Comment = z.infer<typeof zComment>

export const zCommentPayload = zComment.pick({
  content: true,
})

export type CommentPayload = z.infer<typeof zCommentPayload>
