import { useColl } from '@/server/plugins/mongo'
import { zPostList } from '@/entities/post.entity'

export default defineEventHandler(async event => {
  const { skip, take, filterBy, sortBy } = getQuery(event)

  const POST = await useColl('post')
  const COMMENT = await useColl('comment')

  const findOption: any = {}

  if (filterBy && filterBy != 'ALL') {
    findOption.exerciseType = filterBy
  }

  const sort: any = {}

  switch (sortBy) {
    case 'CREATED_AT__DESC':
      sort.createdAt = -1
      break
    case 'CREATED_AT__ASC':
      sort.createdAt = 1
      break
    case 'LAST_COMMENTED_AT__DESC':
      sort.lastCommentedAt = -1
      break
    case 'LAST_COMMENTED_AT__ASC':
      sort.lastCommentedAt = 1
      break
    default:
      sort.createdAt = -1
  }

  const posts = await POST.find(findOption)
    .sort(sort)
    .limit(+(take || 20))
    .skip(+(skip || 0))
    .toArray()

  const comments = await COMMENT.find({
    postUid: { $in: posts.map(post => post.uid) },
  }).toArray()

  return zPostList.parse(
    posts.map(post => {
      return {
        ...post,
        commentCount: comments.filter(comment => comment.postUid === post.uid)
          .length,
      }
    }),
  )
})
