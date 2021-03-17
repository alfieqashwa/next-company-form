import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { QueryClient, useQuery } from 'react-query'
import { dehydrate } from 'react-query/hydration'

import CompanyForm from '../components/CompanyForm'
import OfficeForm from '../components/OfficeForm'
import { CompanyCard } from '../components/CompanyCard'
import { BlankCardMessage } from '../components/BlankCardMessage'

async function getCompanies() {
  const URL = `${process.env.NEXT_PUBLIC_URL}/api/companies`
  const response = await fetch(URL, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) {
    throw new Error("Fetching Error")
  }
  return await response.json();
}

export default function Home() {
  const {
    data,
    isError,
    isLoading,
    isFetching,
    isSuccess
  } = useQuery(
    "companies",
    getCompanies, {
    // staleTime: 3000, // ms  // experiment: the default is 0 ms
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
          <Link href='/offices/id'>Temporary Link</Link>
          {/* {isLoading && <BlankCardMessage message="Loading..." />}
          {isFetching && <BlankCardMessage message="Fetching..." />}
          {isError && <BlankCardMessage message="An error has occurred!" />}
          {data?.length === undefined && (
            <BlankCardMessage message="there is no companies created yet..." />
          )} */}
          <ul className='grid grid-cols-2 gap-x-16 gap-y-10'>
            {data?.map((c) => (
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