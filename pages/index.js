import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { QueryClient, useQuery } from 'react-query'
import { dehydrate } from 'react-query/hydration'

import CompanyForm from '../components/CompanyForm'
import OfficeForm from '../components/OfficeForm'
import { CompanyCard } from '../components/CompanyCard'
import { BlankCardMessage } from '../components/BlankCardMessage'
import { getCompanies } from '../lib/api'


export default function Home() {
  const {
    data,
    isError,
    isLoading,
    isSuccess
  } = useQuery(
    "companies",
    getCompanies, {
    // staleTime: 1000, // ms  // experiment: the default is 0 ms
    refetchInterval: 1000, // Refetch the data every second
    // initialData: initialCompanies // use this if using SSR with InitialData
  })

  // console.log(JSON.stringify(companies, null, 4))
  return (
    <>
      <Head>
        <title>Company Form</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        {/* <link
          href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
          rel="stylesheet"
        /> */}
      </Head>

      <main className="max-w-4xl min-h-screen px-6 py-4 mx-auto my-10 text-gray-500 border-2 border-gray-300 divide-y-2 divide-gray-300 rounded-xl">
        <section className='flex justify-start pb-10 divide-x-2 divide-gray-300 item-center'>
          <CompanyForm />
          {/* <OfficeForm companies={data} /> */}
        </section>
        <section className="p-4">
          <h1 className='my-2 text-3xl'>Companies</h1>
          <Link href='/offices/id'><a className="px-3 py-2 text-gray-600 bg-green-200 rounded-md">Temporary Link</a></Link>
          {isLoading && <BlankCardMessage message="Loading..." />}
          {isError && <BlankCardMessage message="An error has occurred!" />}
          {isSuccess && data?.length === 0 && (
            <div className="flex items-center justify-center p-16">
              <BlankCardMessage message="there is no companies created yet..." />
            </div>
          )}
          <ul className='grid grid-cols-2 gap-x-16 gap-y-10'>
            {isSuccess && data?.map((c) => (
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

// SSR with Initial Data
// export async function getServerSideProps() {
//   const initialCompanies = await getCompanies()
//   return { props: { initialCompanies } }
// }

// SSR with Hydrate
export async function getServerSideProps() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery("companies", getCompanies)

  return {
    props: {
      dehydrateState: dehydrate(queryClient)
    }
  }
}