import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from 'lib/prisma'

// DELETE
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.body

  const result = await prisma.company.delete({
    where: { id },
    include: {
      offices: true
    }
  })
  res.json(result)
}