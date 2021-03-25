import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from 'lib/prisma'

// CREATE
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { name, address, revenue, code, phone } = req.body
  const result = await prisma.company.create({
    data: {
      name: name,
      address: address,
      revenue: parseInt(revenue),
      code: parseInt(code),
      phone: parseInt(phone)
    },
  })
  res.json(result)
}