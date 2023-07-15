export const useUser = defineStore('user', () => {
  const me = ref(null)

  function requestSignin(identify: string) {
    return $fetch('/api/signin', {
      method: 'POST',
      body: {
        identify,
      },
    })
  }

  return {
    me,
    requestSignin,
  }
})
