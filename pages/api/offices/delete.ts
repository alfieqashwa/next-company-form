import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from 'lib/prisma'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.body

  const result = await prisma.office.delete({
    where: { id: id }
  })
  res.json(result)
}