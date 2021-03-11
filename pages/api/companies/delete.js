import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handle(req, res) {
  const { id } = req.body

  const result = await prisma.company.delete({
    where: { id: id },
  })
  res.json(result)
}