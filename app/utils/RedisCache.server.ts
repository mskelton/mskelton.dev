import { createClient } from "redis"

export class RedisCache {
  client = createClient({
    password: process.env.REDIS_PASSWORD,
    url: process.env.REDIS_URL,
  })

  async connect() {
    if (!this.client.isOpen) {
      this.client.on("error", (error) => console.error("REDIS ERROR:", error))

      await this.client.connect()
    }
  }

  async get<T>(key: string, freshen: () => T) {
    await this.connect()
    const value = await this.client.get(key)

    if (value) {
      return JSON.parse(value) as T
    }

    const newValue = await freshen()
    await this.client.set(key, JSON.stringify(newValue))
    return newValue
  }
}
