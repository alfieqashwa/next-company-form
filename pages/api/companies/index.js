import { prisma } from '../../../lib/prisma'

export default async function handle(req, res) {
  const companies = await prisma.company.findMany();
  res.json(companies)
}