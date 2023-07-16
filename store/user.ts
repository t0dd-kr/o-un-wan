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

  async function whoami() {
    const identify = useCookie('identify')

    if (!identify.value) return

    if (me.value) return

    try {
      me.value = await $fetch('/api/whoami')
    } catch (err) {
      location.href = '/'
    }
  }

  return {
    me,
    whoami,
    requestSignin,
  }
})
