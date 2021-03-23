import { prisma } from '../../../lib/prisma'

// READ
export default async function handle(req, res) {
  const companies = await prisma.company.findMany();
  res.json(companies)
}