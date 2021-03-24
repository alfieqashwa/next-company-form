import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from 'lib/prisma'

// CREATE
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { name, latitude, longitude, startDate, companyId } = req.body
  const result = await prisma.office.create({
    data: {
      name: name,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      startDate: startDate,
      company: {
        connect: { id: companyId }
      }
    }
  })

  res.json(result)
}
