import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { QueryClient, useQuery } from 'react-query'
import { dehydrate } from 'react-query/hydration'
import { BlankCardMessage } from '../../components/BlankCardMessage'

import { OfficeCard } from '../../components/OfficeCard'
import { getAllCompanies, getCompany } from '../../lib/api'

export default function Company() {
  const router = useRouter()
  const { id } = router.query
  const {
    data,
    isError,
    isLoading,
    isSuccess
  } = useQuery(
    ["company", id],
    () => getCompany(id)
  )

  isLoading &&
    <BlankCardMessage message="Loading..." />
  isError && <BlankCardMessage message="An error has occurred!" />

  return (
    <>
      <Head>
        <title>Offices</title>
      </Head>
      { isSuccess &&
        <main className="max-w-4xl min-h-screen px-6 py-4 mx-auto my-10 text-gray-500 border-2 border-gray-300 divide-y-2 divide-gray-300 rounded-xl">
          <h1 className="mb-2 text-3xl">{data.name}</h1>
          <section className="relative px-2 py-4 space-y-1">
            <div>
              <h2 className="font-semibold">Address:</h2>
              <h2 className="font-medium">{data.address}</h2>
            </div>
            <div>
              <h2 className="font-semibold">Revenue:</h2>
              <h2 className="font-medium">{data.revenue}</h2>
            </div>
            <div>
              <h2 className="font-semibold">Phone No:</h2>
              <h2 className="font-medium">{(data.code)} {data.phone}</h2>
            </div>
            <Link href="/">
              <button
                className="absolute w-1/3 py-2 text-lg text-gray-100 transition duration-200 ease-in-out bg-gray-500 rounded-lg right-4 bottom-2 hover:bg-gray-400 hover:text-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 disabled:opacity-7"
                type="button">
                Back to Overview
              </button>
            </Link>
          </section>
          <section className="pt-2">
            <h1 className="my-1 text-3xl">Offices</h1>
            {isSuccess && data.offices?.length === 0 && (
              <div className="flex items-center justify-center p-16">
                <BlankCardMessage message="there is no offices created yet..." />
              </div>
            )}
            <ul className='grid grid-cols-2 px-2 gap-x-16 gap-y-10'>
              {data.offices?.map((o) => {
                return (
                  <li key={o.id}>
                    <OfficeCard office={o} />
                  </li>
                )
              })}
            </ul>
          </section>
        </main>
      }
    </>
  )
}
