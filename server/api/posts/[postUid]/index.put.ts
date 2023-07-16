import { useColl } from '@/server/plugins/mongo'

export default defineEventHandler(async event => {
  const identify = event.context.identify || getCookie(event, 'identify')
  const postUid = getRouterParam(event, 'postUid')

  const POST = await useColl('post')
  const USER = await useColl('user')

  const post = await POST.findOne({ uid: postUid })
  const user = await USER.findOne({ identify })

  if (post?.userUid !== user?.uid) {
    return createError({
      statusCode: 403,
      message: 'Forbidden',
    })
  }

  const body = await readBody(event)

  await POST.updateOne(
    {
      uid: postUid,
    },
    {
      $set: {
        content: body.content,
      },
    },
  )

  return true
})
