import { zCommentPayload } from '@/entities/comment.entity'
import { useColl } from '@/server/plugins/mongo'
import { genUid } from '@/server/utils'

export default defineEventHandler(async event => {
  const identify = event.context.identify || getCookie(event, 'identify')
  const postUid = getRouterParam(event, 'postUid')
  const { content } = zCommentPayload.parse(await readBody(event))

  const USER = await useColl('user')
  const POST = await useColl('post')
  const COMMENT = await useColl('comment')

  const user = await USER.findOne({ identify })

  if (!user) {
    return createError({
      statusCode: 403,
      message: 'Forbidden',
    })
  }

  const post = await POST.findOne({ uid: postUid })

  if (!post) {
    return createError({
      statusCode: 404,
      message: 'Not found',
    })
  }

  await COMMENT.insertOne({
    uid: genUid(),
    userUid: user.uid,
    postUid,
    content,
    createdAt: new Date(),
  })

  await POST.updateOne(
    {
      uid: postUid,
    },
    {
      $set: {
        lastCommentedAt: new Date(),
      },
    },
  )

  return true
})
