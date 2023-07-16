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

  const COMMENT = await useColl('comment')

  const commentUid = getRouterParam(event, 'commentUid')

  await COMMENT.deleteOne({ uid: commentUid })

  return true
})
