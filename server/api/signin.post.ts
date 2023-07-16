import { User, zSigninPayload } from '@/entities/user.entity'
import { genUid } from '@/server/utils'
import { useColl } from '@/server/plugins/mongo'

export default defineEventHandler(async event => {
  const { identify } = zSigninPayload.parse(await readBody(event))

  const USER = await useColl('user')

  let user = await USER.findOne<User>({ identify })

  if (!user) {
    await USER.insertOne({
      identify,
      uid: genUid(),
    })

    user = await USER.findOne<User>({ identify })
  }

  setCookie(event, 'identify', identify)
  event.context.identify = identify

  return true
})
