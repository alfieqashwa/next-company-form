import { useState } from 'react'
import Link from 'next/link'
import { PrismaClient } from '@prisma/client'
import Head from 'next/head'

import CompanyForm from '../src/components/CompanyForm'
import OfficeForm from '../src/components/OfficeForm'
import { CompanyCard } from '../src/components/CompanyCard'
import { BlankCardMessage } from '../src/components/BlankCardMessage'

const prisma = new PrismaClient()

async function saveCompany(company) {
  const response = await fetch('/api/companies', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(company)
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}



export default function Index({ initialCompanies }) {
  const [companies, setCompanies] = useState(initialCompanies)

  return (
    <>
      <Head>
        <title>Company Form</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
          rel="stylesheet"
        />
      </Head>

      <main className="max-w-4xl min-h-screen px-6 py-4 mx-auto my-10 text-gray-500 border-2 border-gray-300 divide-y-2 divide-gray-300 rounded-xl">
        <section className='flex justify-start pb-10 divide-x-2 divide-gray-300 item-center'>
          <CompanyForm onSubmit={async (data, e) => {
            try {
              await saveCompany(data)
              setCompanies([...companies, data])
              e.target.reset()
            } catch (err) {
              console.log(err)
            }
          }
          } />
          <OfficeForm companies={companies} />
        </section>
        <section className="p-4">
          <h1 className='my-2 text-3xl'>Companies</h1>
          <Link href='/offices/id'>Temporary Link</Link>
          {companies.length === 0 && (
            <BlankCardMessage message="there is no companies created yet..." />
          )}
          <ul className='grid grid-cols-2 gap-x-16 gap-y-10'>
            {companies?.map((c) => (
              <li key={c.id}>
                <CompanyCard company={c} />
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  )
}

export async function getServerSideProps() {
  const companies = await prisma.company.findMany()
  return {
    props: {
      initialCompanies: companies
    }
  }
}