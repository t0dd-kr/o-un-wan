export default defineNuxtRouteMiddleware(async (to, from) => {
  const { whoami } = useUser()
  const { me } = storeToRefs(useUser())
  const identify = useCookie('identify')

  await whoami()

  if (!me.value) {
    identify.value = null
  }

  if (!identify.value && to.path != '/signin') {
    // NOTE: 로그인 되어 있지 않은 경우, 로그인 페이지로 이동
    return navigateTo('/signin')
  }

  if (identify.value && to.path == '/signin') {
    // NOTE: 로그인 되어 있는 경우, 로그인 페이지 접근 불가능
    return navigateTo('/')
  }
})
