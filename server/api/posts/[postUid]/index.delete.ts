import { useColl } from '@/server/plugins/mongo'

export default defineEventHandler(async event => {
  const identify = event.context.identify || getCookie(event, 'identify')

  const USER = await useColl('user')
  const user = await USER.findOne({ identify })

  if (user?.isManager) {
    return createError({
      statusCode: 403,
      message: 'Forbidden',
    })
  }

  const POST = await useColl('post')
  const COMMENT = await useColl('comment')

  const postUid = getRouterParam(event, 'postUid')

  await POST.deleteOne({ uid: postUid })
  await COMMENT.deleteMany({ postUid })

  return true
})
