import { PostList } from '@/entities/post.entity'

export const usePost = defineStore('post', () => {
  const posts = ref<PostList>([])

  const eol = ref(false)

  const sortBy = ref('CREATED_AT__DESC')
  const showSortModal = ref(false)

  const sortByOptions = ref([
    {
      label: '최신 순',
      value: 'CREATED_AT__DESC',
    },
    {
      label: '오래된 순',
      value: 'CREATED_AT__ASC',
    },
    {
      label: '최신 댓글 순',
      value: 'LAST_COMMENTED_AT__DESC',
    },
    {
      label: '오래된 댓글 순',
      value: 'LAST_COMMENTED_AT__ASC',
    },
  ])

  const sortByLabel = computed(() => {
    return sortByOptions.value.find(option => option.value === sortBy.value)
      ?.label
  })

  function setSortBy(value: string) {
    sortBy.value = value
    showSortModal.value = false
  }

  const filterBy = ref('ALL')
  const showFilterModal = ref(false)
  const filterByOptions = ref([
    {
      label: '전체',
      value: 'ALL',
    },
    {
      label: '달리기',
      value: 'RUNNING',
    },
    {
      label: '런지',
      value: 'LUNGE',
    },
    {
      label: '스쿼트',
      value: 'SQUAT',
    },
    {
      label: '벤치프레스',
      value: 'BENCH_PRESS',
    },
    {
      label: '기타',
      value: 'ETC',
    },
  ])

  const filterByLabel = computed(() => {
    return filterByOptions.value.find(option => option.value === filterBy.value)
      ?.label
  })

  function setFilterBy(value: string) {
    filterBy.value = value
    showFilterModal.value = false
  }

  async function getPosts(reset: boolean = false) {
    if (reset) {
      posts.value = []
      eol.value = false
    }

    if (eol.value) {
      return
    }

    const morePosts = await $fetch<PostList>('/api/posts', {
      method: 'GET',
      query: {
        sortBy: sortBy.value,
        filterBy: filterBy.value,
        skip: posts.value.length,
        take: posts.value.length == 0 ? 20 : 21,
      },
    })

    if (morePosts.length == 0) {
      eol.value = true
      return
    }

    posts.value = [...posts.value, ...morePosts]
  }

  return {
    sortBy,
    sortByOptions,
    sortByLabel,
    showSortModal,
    setSortBy,

    filterBy,
    filterByOptions,
    filterByLabel,
    showFilterModal,
    setFilterBy,

    posts,
    getPosts,
  }
})
