import { useRef } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { FaSpinner } from 'react-icons/fa'

import { OfficeModal } from './OfficeModal';
import { removeOffice } from '../lib/api';
import { ButtonRemove } from './ButtonRemove';

export function OfficeCard({ office }) {
  const modalOfficeRef = useRef()
  const queryClient = useQueryClient()
  const { mutateAsync, isLoading, isSuccess } = useMutation(removeOffice)

  const remove = async () => {
    await mutateAsync(office.id)
    queryClient.invalidateQueries("company")
  }

  return (
    <div className='px-2 pt-1 pb-3 mt-2 text-gray-500 transition duration-300 ease-in-out border-2 border-gray-300 rounded-md hover:shadow-2xl'>
      <div className='flex justify-between pb-1 border-b border-gray-300'>
        <h2 className='font-semibold capitalize'>{office.name}</h2>
        <ButtonRemove onClick={() => modalOfficeRef.current.open()} />
        <OfficeModal ref={modalOfficeRef}>
          <div className="w-full space-y-10">
            <h2 className="text-xl font-medium text-center text-red-500">Are you sure ?</h2>
            <div className="flex items-center justify-between px-14">
              <button className="px-4 py-2 text-sm text-white bg-red-500 rounded-md focus:ring-offset-1 focus:ring-2 focus:ring-red-500 focus:outline-none"
                type="button"
                onClick={() => modalOfficeRef.current.close()}
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
                {isSuccess && modalOfficeRef.current.close()}
              </button>
            </div>
          </div>
        </OfficeModal>
      </div>
      <div className='px-1'>
        <div className='py-1'>
          <h3 className='text-sm font-semibold'>Location:</h3>
          <h6 className='w-5/6 text-xs tracking-tight capitalize'>{office.latitude}</h6>
          <h6 className='w-5/6 text-xs tracking-tight capitalize'>{office.longitude}</h6>
        </div>
        <div className='py-1'>
          <h3 className='text-sm font-semibold'>Office Start Date:</h3>
          <h6 className='text-xs'>{office.startDate.substring(0, 10)}</h6>
        </div>
      </div>
    </div>
  );
}