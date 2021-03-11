// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handle(req, res) {
  const { name, address, revenue, code, phone } = req.body
  const result = await prisma.company.create({
    data: {
      name: name, address: address, revenue: parseInt(revenue), code: parseInt(code), phone: parseInt(phone)
    },
  })
  res.json(result)
}
