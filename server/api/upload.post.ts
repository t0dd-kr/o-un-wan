import multer from 'multer'
import { callNodeListener } from 'h3'

export default defineEventHandler(async event => {
  const DIR =
    process.env.NODE_ENV == 'production'
      ? '.output/public/images'
      : 'public/images'
  try {
    let filePaths: string[] = []
    let fileNames: string[] = []
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, DIR)
      },
      filename: (req, file, cbd) => {
        const filePath = `${Date.now()}-${file.originalname
          .toLocaleLowerCase()
          .replace(/\s+/g, '-')}`
        filePaths.push(filePath)
        fileNames.push(file.originalname)
        cbd(null, filePath)
      },
    })

    const upload = multer({
      storage: storage,
      fileFilter: (req, file, cb) => {
        if (
          file.mimetype == 'image/png' ||
          file.mimetype == 'image/jpeg' ||
          file.mimetype === 'image/webp'
        ) {
          cb(null, true)
        } else {
          cb(new Error('Invalid file type'))
        }
      },
    })

    await callNodeListener(
      // @ts-expect-error: Nuxt 3
      upload.array('files', 5),
      event.node.req,
      event.node.res,
    )

    return filePaths.map(e => `/${e}`)
  } catch (error) {
    console.log(error)
    return createError({
      statusCode: 500,
      statusMessage: 'Something went wrong.',
    })
  }
})
