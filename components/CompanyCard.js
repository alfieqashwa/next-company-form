import Link from 'next/link'
import { useRef } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { FaSpinner } from 'react-icons/fa'

import { CompanyModal } from './CompanyModal';
import { ButtonRemove } from './ButtonRemove'
import { removeCompany } from '../lib/api';

export function CompanyCard({ company }) {
  const modalCompanyRef = useRef()
  const queryClient = useQueryClient()
  const { mutateAsync, isLoading, isSuccess } = useMutation(removeCompany)

  const remove = async () => {
    await mutateAsync(company.id)
    queryClient.invalidateQueries("companies")
  }

  return (
    <div className='px-2 pt-1 pb-3 mt-2 text-gray-500 transition duration-500 ease-in-out border-2 border-gray-300 rounded-lg hover:shadow-2xl'>
      <div className='flex justify-between pb-1 border-b border-gray-300'>
        <h2 className='font-semibold capitalize'>{company.name}</h2>
        <ButtonRemove onClick={() => modalCompanyRef.current.open()} />
        <CompanyModal ref={modalCompanyRef}>
          <div className="w-full space-y-10">
            <h2 className="text-xl font-medium text-center text-red-500">Are you sure ?</h2>
            <div className="flex items-center justify-between px-14">
              <button className="px-4 py-2 text-sm text-white bg-red-500 rounded-md focus:ring-offset-1 focus:ring-2 focus:ring-red-500 focus:outline-none"
                type="button"
                onClick={() => modalCompanyRef.current.close()}
              >
                Cancel
                </button>
              <button className="px-4 py-2 text-sm text-white bg-green-600 rounded-md focus:ring-offset-1 focus:ring-2 focus:ring-green-600 focus:outline-none"
                type="button"
                onClick={remove}
              >{isLoading
                ? <FaSpinner className="w-5 h-5" />
                : <h3>Delete</h3>
                }
                {isSuccess && modalCompanyRef.current.close()}
              </button>
            </div>
          </div>
        </CompanyModal>
      </div>
      <Link href={`/companies/${encodeURIComponent(company.id)}`}>
        <a className='px-1'>
          <div className='py-1'>
            <h3 className='text-sm font-semibold'>Address:</h3>
            <h6 className='w-5/6 text-xs tracking-tight capitalize'>{company.address}</h6>
          </div>
          <div className='py-1'>
            <h3 className='text-sm font-semibold'>Revenue:</h3>
            <h6 className='text-xs'>{company.revenue}</h6>
          </div>
          <div className='py-1'>
            <h3 className='text-sm font-semibold'>Phone No:</h3>
            <h6 className='text-xs'>
              <span>({company.code}) - </span>
              {company.phone}
            </h6>
          </div>
        </a>
      </Link>
    </div>
  );
}
