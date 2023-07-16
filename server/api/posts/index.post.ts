import { genUid } from '@/server/utils'
import { useColl } from '@/server/plugins/mongo'
import { zPostPayload } from '@/entities/post.entity'
import { User } from 'entities/user.entity'

export default defineEventHandler(async event => {
  const { images, content, exerciseType } = zPostPayload.parse(
    await readBody(event),
  )

  const identify = event.context.identify || getCookie(event, 'identify')

  const POST = await useColl('post')
  const USER = await useColl('user')

  const user = await USER.findOne<User>({ identify })

  if (!user) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized',
    })
  }

  await POST.insertOne({
    uid: genUid(),
    userUid: user.uid,
    images,
    content,
    exerciseType,
    createdAt: new Date(),
  })

  return true
})
