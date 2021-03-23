import { QueryClient, useQuery } from 'react-query'
import { dehydrate } from 'react-query/hydration'

import Layout from '../components/Layout'
import CompanyForm from '../components/CompanyForm'
import OfficeForm from '../components/OfficeForm'
import { CompanyCard } from '../components/CompanyCard'
import { BlankCardMessage } from '../components/BlankCardMessage'
import { getAllCompanies } from '../lib/api'


export default function Home() {
  const {
    data,
    isError,
    isLoading,
    isSuccess
  } = useQuery(
    "companies",
    getAllCompanies, {
    // staleTime: 1000, // ms  // experiment: the default is 0 ms
    refetchInterval: 2000, // Refetch the data every second
    // initialData: initialCompanies // use this if using SSR with InitialData
  })

  // console.log(JSON.stringify(companies, null, 4))
  return (
    <Layout
      title="Company Form"
      main={
        <>
          <section className='grid grid-cols-1 pb-10 space-y-8 md:space-y-0 md:divide-x-2 md:divide-gray-300 md:grid-cols-2'>
            <CompanyForm />
            {isSuccess && data?.length === 0
              ? (
                <div className="flex items-center justify-center p-16">
                  <BlankCardMessage message="no companies created yet..." />
                </div>
              )
              : (<OfficeForm companies={data} />)
            }
          </section>
          <section className="p-4">
            <h1 className='my-2 text-3xl'>Companies</h1>
            {isLoading && <BlankCardMessage message="Loading..." />}
            {isError && <BlankCardMessage message="An error has occurred!" />}
            <ul className='grid grid-cols-1 gap-y-8 md:grid-cols-2 md:gap-x-16 md:gap-y-10'>
              {isSuccess && data?.map((c) => (
                <li key={c.id}>
                  <CompanyCard company={c} />
                </li>
              ))}
            </ul>
          </section>
        </>
      }
    />
  )
}

// SSR with Hydrate
export async function getServerSideProps() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery("companies", getAllCompanies)

  return {
    props: {
      dehydrateState: dehydrate(queryClient)
    }
  }
}

// SSR with Initial Data
// export async function getServerSideProps() {
//   const initialCompanies = await getAllCompanies()
//   return { props: { initialCompanies } }
// }
