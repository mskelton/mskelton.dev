import { createClient } from "@libsql/client"
import { PrismaLibSQL } from "@prisma/adapter-libsql"
import { PrismaClient } from "@prisma/client"
import { singleton } from "./singleton"

const prisma = singleton("prisma", () => {
  const libsql = createClient({
    authToken: process.env.TURSO_AUTH_TOKEN,
    url: process.env.TURSO_DATABASE_URL!,
  })

  const adapter = new PrismaLibSQL(libsql)
  const prisma = new PrismaClient({ adapter })

  return prisma
})

export default prisma
