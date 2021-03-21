import { prisma } from '../../../lib/prisma'

export default async function handle(req, res) {
  const { id } = req.body

  const result = await prisma.office.delete({
    where: { id: id }
  })
  res.json(result)
}