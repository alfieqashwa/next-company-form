import { useMutation, useQueryClient } from 'react-query'
import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker'
// import format from 'date-fns/format'

import 'react-datepicker/dist/react-datepicker.css'

import { ButtonForm } from './ButtonForm';
import { Input } from './Input';
import { FormError } from './ErrorForm'
import { TitleForm } from './TitleForm';
import { createOffice } from '../lib/api'

export default function OfficeForm(props) {

  const queryClient = useQueryClient()
  const { handleSubmit, errors, register, reset, clearErrors, control } = useForm()

  const { status, mutateAsync } = useMutation(createOffice, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("offices");
      clearErrors();
      reset();
    }
  })

  const onSubmit = async (data) => {
    await mutateAsync(data)

    //  === TESTING ===
    //   const { name, latitude, longitude, startDate, companyId
    //   } = data;
    //   const formatStartDate = format(startDate, 'yyyy-LL-dd')
    //   await console.log(JSON.stringify({ name, latitude, longitude, formatStartDate, companyId }, null, 2))
  }

  if (props.companies?.length === 0) {
    return (
      <div className="flex items-center justify-center">
        <h2>There is no company created ...</h2>
      </div>
    )
  }

  return (
    <div className="md:pl-8">
      <TitleForm title="Create Office" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="px-2 mb-8 space-y-2">
          <>
            <Input label="Name" name="name" placeholder="name" type="text" formRef={register({ required: true })} />
            {errors.name && (
              <FormError errorMessage="Name is required" />
            )}
          </>
          <div className="">
            <label className='block font-semibold'>
              Location:
            </label>
            <div className="flex space-x-4">
              <div className="space-y-1">
                <input className="px-2 py-1 border border-gray-300 rounded-md w-36 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset" name="latitude" placeholder="latitude" type="number" step="any" ref={register({ required: true, min: 0, maxLength: 12 })} />
                {errors.latitude?.type === "required" && (
                  <FormError errorMessage="Name is required" />
                )}
                {errors.latitude?.type === "min" && (
                  <FormError errorMessage="Should be positive float number" />
                )}
                {errors.latitude?.type === "maxLength" && (
                  <FormError errorMessage="Max length is 12" />
                )}
              </div>
              <div className="space-y-1">
                <input className="px-2 py-1 border border-gray-300 rounded-md w-36 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset" name="longitude" placeholder="longitude" type="number" step="any" ref={register({ required: true, min: 0, maxLength: 12 })} />
                {errors.longitude?.type === "required" && (
                  <FormError errorMessage="Name is required" />
                )}
                {errors.longitude?.type === "min" && (
                  <FormError errorMessage="Should be positive float number" />
                )}
                {errors.longitude?.type === "maxLength" && (
                  <FormError errorMessage="Max length is 12" />
                )}
              </div>
            </div>
          </div>
          <>
            <div className="w-10/12 space-y-1 md-4/5">
              <label className="block font-semibold">Start Date</label>
              <div className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none">
                <Controller
                  name="startDate"
                  control={control}
                  defaultValue={null}
                  rules={{ required: true }}
                  render={
                    ({ onChange, value }) => <DatePicker
                      selected={value}
                      onChange={onChange}
                      placeholderText="startDate"
                      dateFormat="yyyy/MM/dd"
                    />
                  }
                />
              </div>
              {errors.startDate && (
                <FormError errorMessage="Required date, please!!" />
              )}
            </div>
          </>
          <div className="">
            <label className='block font-semibold'>
              Company
            </label>
            <select
              className='w-11/12 px-2 py-1 capitalize border border-gray-300 rounded-md md:w-4/5 focus:outline-none focus:ring-2 ring-gray-300 ring-offset-2'
              type='text'
              name='companyId'
              placeholder='select one...'
              ref={register({ required: true })}
            >
              {props.companies?.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            {errors.companyId && (
              <FormError errorMessage="Select one..." />
            )}
          </div>
        </div>
        <ButtonForm type="submit" disabled={status === "loading"} disabledTrueStatus="Creating..." disabledFalseStatus="Create" />
      </form>
    </div>
  )
}