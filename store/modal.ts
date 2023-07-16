export type ModalButton = {
  label: string
  class: string
  cb: () => void
}

export const useModal = defineStore('modal', () => {
  const show = ref(false)
  const title = ref('')
  const content = ref('')
  const buttons = ref([])

  function open(payload: any) {
    show.value = true
    title.value = payload.title
    content.value = payload.content
    buttons.value = payload.buttons
  }

  function close() {
    show.value = false
    title.value = ''
    content.value = ''
    buttons.value = []
  }

  return {
    show,
    title,
    content,
    buttons,
    open,
    close,
  }
})
