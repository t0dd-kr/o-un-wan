import { MongoClient } from 'mongodb'

const {
  MONGO_DB_NAME,
  MONGO_PASSWORD,
  MONGO_USERNAME,
  MONGO_HOST,
  MONGO_PORT,
} = useRuntimeConfig()

export let connectedCount = 0

let client: MongoClient | null = null

export function connectDB() {
  client = new MongoClient(
    `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}?authSource=admin`,
  )

  client.connect()
}

export function useDB() {
  if (!client) {
    connectDB()
  }

  return (client as MongoClient).db(MONGO_DB_NAME)
}

export async function dropCollection(collectionName: string) {
  const DB = useDB()
  if (
    (await DB.listCollections().toArray())
      .map(c => c.name)
      .includes(collectionName)
  ) {
    await DB.dropCollection(collectionName)
  }
}

export async function useColl(name: string) {
  let DB = useDB()

  let coll = null

  if ((await DB.listCollections().toArray()).map(c => c.name).includes(name)) {
    coll = DB.collection(name)
  } else {
    coll = await DB.createCollection(name)
  }

  return coll
}

export default defineNitroPlugin(nitroApp => {
  console.log(`Connecting MongoDB...`)
  useDB()
})
