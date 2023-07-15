// ~/plugins/dayjs.ts
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import updateLocale from 'dayjs/plugin/updateLocale'
import 'dayjs/locale/ko'

dayjs.extend(relativeTime)
dayjs.extend(localizedFormat)
dayjs.extend(updateLocale)

export default dayjs
