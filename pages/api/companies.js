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

// export default async (req, res) => {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method not allowed!' })
//   }

//   try {
//     const company = JSON.parse(req.body)
//     const savedCompany = await prisma.company.create({ data: company })
//     res.status(200).json(savedCompany)
//   } catch (err) {
//     res.status(400).json({ message: 'Something went wrong' })
//   }
// }

