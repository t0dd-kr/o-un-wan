import { z } from 'zod'
import { zComment } from './comment.entity'

export const zPost = z.object({
  uid: z.string(),
  userUid: z.string(),
  content: z.string().optional(),
  images: z.array(z.string()),
  exerciseType: z.enum(['SQUAT', 'BENCH_PRESS', 'LUNGE', 'RUNNING', 'ETC']),
  lastCommentedAt: z.date().optional(),
  createdAt: z.date(),
})

export type Post = z.infer<typeof zPost>

export const zPostPayload = zPost.pick({
  images: true,
  content: true,
  exerciseType: true,
})

export type PostPayload = z.infer<typeof zPostPayload>

export const zPostList = z.array(
  zPost.extend({
    comments: z.array(zComment),
  }),
)

export type PostList = z.infer<typeof zPostList>
