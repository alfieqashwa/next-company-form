import { useState } from 'react'
import { PrismaClient } from '@prisma/client'
import Head from 'next/head'

import CompanyForm from '../src/components/CompanyForm'
import OfficeForm from '../src/components/OfficeForm'

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
        {/* <meta http-equiv="origin-trial" content="Aurd7QTib2GQwZ/6a4/dy7EflimWWZZQv96Bu7T4rH6KcbovVc2FyuPcrt/3By+2N/FfZcuo2Sq6/vECize1wQsAAABgeyJvcmlnaW4iOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJmZWF0dXJlIjoiVW5yZXN0cmljdGVkU2hhcmVkQXJyYXlCdWZmZXIiLCJleHBpcnkiOjE2MzM0NzgzOTl9"></meta> */}
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
          <OfficeForm />
        </section>
        <section>
          <div className="mt-10">
            <pre>{JSON.stringify(companies, null, 2)}</pre>
          </div>
        </section>
      </main>
    </>
  )
}

export async function getServerSideProps() {
  const companies = await prisma.company.findMany()
  return { props: { initialCompanies: companies } }
}