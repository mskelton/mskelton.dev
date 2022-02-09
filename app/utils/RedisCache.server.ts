export class RedisCache {
  cache: Record<string, any> = {}

  async get<T>(key: string, freshen: () => T) {
    if (!this.cache[key]) {
      this.cache[key] = await freshen()
    }

    return this.cache[key] as T
  }
}
