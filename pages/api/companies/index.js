import { prisma } from '../../../lib/prisma'

export default async function handle(req, res) {
  if (req.method === 'GET') {
    handleGET(req, res)
  } else if (req.method === 'POST') {
    handlePOST(req, res)
  } else if (req.method === 'DELETE') {
    handleDELETE(req, res)
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    )
  }
}

// GET
async function handleGET(req, res) {
  const companies = await prisma.company.findMany();
  res.json(companies)
}

// POST
async function handlePOST(req, res) {
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

// DELETE
async function handleDELETE(req, res) {
  const { id } = req.body

  const result = await prisma.company.delete({
    where: { id: id },
  })
  res.json(result)
}