import { prisma } from '../../../lib/prisma'

// GET A COMPANY
export default async function handle(req, res) {
  const { id } = req.query

  const result = await prisma.company.findUnique({
    where: { id },
    include: { offices: true }
  })

  res.json(result)
}