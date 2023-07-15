import { zSigninPayload } from '@/entities/user.entity'

export default defineEventHandler(async event => {
  const { identify } = zSigninPayload.parse(await readBody(event))

  setCookie(event, 'identify', identify)

  return true
})
