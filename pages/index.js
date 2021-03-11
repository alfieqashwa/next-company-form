import { useState } from 'react'
import { PrismaClient } from '@prisma/client'
import Head from 'next/head'

const prisma = new PrismaClient()

export default function Home({ initialCompanies }) {
  const [companies, setCompanies] = useState(initialCompanies)

  return (
    <div>
      <Head>
        <title>Company Form</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className='text-2xl text-blue-700'>
          Company Form
        </h1>
        <pre>{JSON.stringify(companies, null, 2)}</pre>

      </main>

    </div>
  )
}

export async function getServerSideProps() {
  const companies = await prisma.company.findMany()
  return { props: { initialCompanies: companies } }
}