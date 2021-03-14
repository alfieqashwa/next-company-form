import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handle(req, res) {
  const companies = await prisma.company.findMany();
  res.json(companies)
}