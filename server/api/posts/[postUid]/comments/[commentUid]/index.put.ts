import { useColl } from '@/server/plugins/mongo'

export default defineEventHandler(async event => {
  const identify = event.context.identify || getCookie(event, 'identify')
  const commentUid = getRouterParam(event, 'commentUid')

  const COMMENT = await useColl('post')
  const USER = await useColl('user')

  const comment = await COMMENT.findOne({ uid: commentUid })
  const user = await USER.findOne({ identify })

  if (comment?.userUid !== user?.uid) {
    return createError({
      statusCode: 403,
      message: 'Forbidden',
    })
  }

  const body = await readBody(event)

  await COMMENT.updateOne(
    {
      uid: commentUid,
    },
    {
      $set: {
        content: body.content,
      },
    },
  )

  return true
})
