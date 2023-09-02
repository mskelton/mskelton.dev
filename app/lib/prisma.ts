import { PrismaClient } from "@prisma/client"
import { singleton } from "./singleton"

const prisma = singleton("prisma", () => new PrismaClient())

export default prisma
