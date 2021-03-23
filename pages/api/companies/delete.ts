import { prisma } from '../../../lib/prisma'

// DELETE
export default async function handle(req, res) {
  const { id } = req.body

  const result = await prisma.company.delete({
    where: { id: id },
    include: {
      offices: true
    }
  })
  res.json(result)
}