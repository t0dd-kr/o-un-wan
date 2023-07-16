import { faker } from '@faker-js/faker/locale/ko'
import { User, zUser } from '@/entities/user.entity'
import { useColl } from '@/server/plugins/mongo'
import { genUid } from '@/server/utils'
import { Post, zPost } from '@/entities/post.entity'
import { zComment } from '@/entities/comment.entity'
export default defineEventHandler(async event => {
  const USER = await useColl('user')
  const POST = await useColl('post')
  const COMMENT = await useColl('comment')

  await USER.deleteMany()
  await POST.deleteMany()
  await COMMENT.deleteMany()

  const users = []
  for (let i = 0; i < 100; i++) {
    users.push(seedUser())
  }
  await USER.insertMany(users)

  const posts = []
  for (let i = 0; i < 100; i++) {
    posts.push(seedPost(users))
  }
  await POST.insertMany(posts)

  const comments = []
  for (let i = 0; i < 200; i++) {
    comments.push(seedComment(users, posts))
  }
  await COMMENT.insertMany(comments)

  await Promise.all(
    comments.map(comment => {
      return POST.updateOne(
        { uid: comment.postUid },
        {
          $set: {
            lastCommentedAt: comment.createdAt,
          },
        },
      )
    }),
  )

  return true
})

function randomFrom(arr: any[]) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function seedUser() {
  return zUser.parse({
    uid: genUid(),
    identify: faker.internet.displayName(),
    isManager: false,
  })
}

function seedPost(users: User[]) {
  return zPost.parse({
    uid: genUid(),
    userUid: randomFrom(users).uid,
    content: faker.lorem.paragraph(),
    images: new Array(Math.floor(Math.random() * 5 + 1))
      .fill(0)
      .map(() => faker.image.url()),
    exerciseType: randomFrom([
      'SQUAT',
      'BENCH_PRESS',
      'LUNGE',
      'RUNNING',
      'ETC',
    ]),
    createdAt: faker.date.anytime(),
  })
}

function seedComment(users: User[], posts: Post[]) {
  return zComment.parse({
    uid: genUid(),
    userUid: randomFrom(users).uid,
    postUid: randomFrom(posts).uid,
    content: faker.lorem.paragraph(),
    createdAt: faker.date.anytime(),
  })
}
