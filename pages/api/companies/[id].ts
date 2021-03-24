import type { NextApiRequest, NextApiResponse } from 'next'
import { Company, Office, prisma } from 'lib/prisma'

// GET A COMPANY
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  // const { id }: { [ key: string ]: string | string[] | undefined } = req.query

  const { id } = req.query
  const result: (Company & {
    offices: Office[];
  }) | null = await prisma.company.findUnique({
    where: { id: id.toString() },
    include: { offices: true }
  })

  res.json(result)
}