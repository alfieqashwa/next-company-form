import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { BlankCardMessage } from 'components/BlankCardMessage';

import Layout from 'components/Layout';
import { OfficeCard } from 'components/OfficeCard';
import { getCompany } from 'lib/api';
import { Office } from 'lib/prisma';

export default function Company() {
  const router = useRouter();
  const { id } = router.query;
  const { data, isError, isLoading, isSuccess } = useQuery(
    ['company', id],
    () => getCompany(id)
  );

  isLoading && <BlankCardMessage message='Loading...' />;
  isError && <BlankCardMessage message='An error has occurred!' />;

  return (
    <Layout
      title='Offices'
      main={
        <>
          {isSuccess && (
            <>
              <h1 className='mb-2 text-3xl text-center capitalize md:text-left'>
                {data.name}
              </h1>
              <section className='relative px-2 py-4 space-y-1'>
                <div>
                  <h2 className='font-semibold'>Address:</h2>
                  <h2 className='font-medium'>{data.address}</h2>
                </div>
                <div>
                  <h2 className='font-semibold'>Revenue:</h2>
                  <h2 className='font-medium'>{data.revenue}</h2>
                </div>
                <div>
                  <h2 className='font-semibold'>Phone No:</h2>
                  <h2 className='font-medium'>
                    {data.code} {data.phone}
                  </h2>
                </div>
                <Link href='/'>
                  <button
                    className='absolute px-4 py-2 text-lg text-gray-100 transition duration-300 ease-in-out bg-gray-500 rounded-lg md:w-1/3 md:py-2 md:px-4 right-4 bottom-2 hover:shadow-md hover:bg-gray-400 hover:text-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 disabled:opacity-7'
                    type='button'>
                    Back to Overview
                  </button>
                </Link>
              </section>
              <section className='pt-2'>
                <h1 className='mt-2 text-3xl text-center md:text-left'>
                  Offices
                </h1>
                {isSuccess && data.offices?.length === 0 && (
                  <div className='flex items-center justify-center p-16'>
                    <BlankCardMessage message='there is no offices created yet...' />
                  </div>
                )}
                <ul className='grid grid-cols-1 px-2 md:grid-cols-2 md:gap-x-16 gap-y-8 md:gap-y-10'>
                  {data.offices?.map((o: Office) => {
                    return (
                      <li key={o.id}>
                        <OfficeCard office={o} />
                      </li>
                    );
                  })}
                </ul>
              </section>
            </>
          )}
        </>
      }
    />
  );
}
