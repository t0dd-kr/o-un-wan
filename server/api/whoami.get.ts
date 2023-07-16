import { useColl } from '@/server/plugins/mongo'
import { User } from 'entities/user.entity'

export default defineEventHandler(async event => {
  if (!getCookie(event, 'identify')) {
    return true
  }

  const identify = event.context.identify || getCookie(event, 'identify')

  const USER = await useColl('user')

  const user = await USER.findOne<User>(
    { identify },
    {
      projection: {
        _id: false,
      },
    },
  )

  return user
})
