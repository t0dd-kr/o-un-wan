import { zSigninPayload } from '@/entities/user.entity'
import { genUid } from '@/server/utils'
import { useColl } from '@/server/plugins/mongo'

export default defineEventHandler(async event => {
  const { identify } = zSigninPayload.parse(await readBody(event))

  setCookie(event, 'identify', identify)
  event.context.identify = identify

  const USER = await useColl('user')

  const user = await USER.findOne({ identify })

  if (!user) {
    await USER.insertOne({
      identify,
      uid: genUid(),
    })
  }

  return true
})
