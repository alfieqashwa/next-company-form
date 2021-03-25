import { PrismaClient, Prisma, Company, Office } from '@prisma/client'

const prisma = new PrismaClient({
  // log: process.env.NODE_ENV === "development" ? ["query", "info", "warn"] : []
  log: [ "query", "info", "warn" ],
})

export { prisma }
export type { Company, Office, Prisma }