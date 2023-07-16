import { useColl } from '@/server/plugins/mongo'

export default defineEventHandler(async event => {
  if (!getCookie(event, 'identify')) {
    return true
  }

  const identify = event.context.identify || getCookie(event, 'identify')

  const USER = await useColl('user')

  const user = await USER.findOne(
    { identify },
    {
      projection: {
        _id: false,
      },
    },
  )

  return user
})
