import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'lib/prisma'

// READ
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const companies = await prisma.company.findMany();
  res.json(companies)
}