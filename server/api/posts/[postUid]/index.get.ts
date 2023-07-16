import { useColl } from '@/server/plugins/mongo'
import { zPost } from '@/entities/post.entity'

export default defineEventHandler(async event => {
  const postUid = getRouterParam(event, 'postUid')

  const POST = await useColl('post')
  const COMMENT = await useColl('comment')
  const USER = await useColl('user')

  const post = await POST.findOne({ uid: postUid })

  if (!post) {
    return createError({
      statusCode: 404,
      message: 'Not found',
    })
  }

  const comments = await COMMENT.find({ postUid })
    .sort({
      createdAt: -1,
    })
    .toArray()
  const commentUsers = await USER.find({
    uid: {
      $in: comments.map(comment => comment.userUid),
    },
  }).toArray()

  const user = await USER.findOne({ uid: post.userUid })

  return zPost.parse({
    ...post,
    identify: user?.identify,
    comments: comments.map(comment => ({
      ...comment,
      identify: commentUsers.find(user => user.uid === comment.userUid)
        ?.identify,
    })),
  })
})
