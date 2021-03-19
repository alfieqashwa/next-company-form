import { useMutation, useQueryClient } from 'react-query'
import { useForm } from 'react-hook-form';
import { ButtonForm } from './ButtonForm';
import { Input } from './Input';
import { FormError } from './ErrorForm'
import { createOffice } from '../lib/api'

export default function OfficeForm(props) {
  const queryClient = useQueryClient()
  const { handleSubmit, errors, register, reset, clearErrors } = useForm()

  const { status, mutateAsync } = useMutation(createOffice, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("offices");
      clearErrors();
      reset();
    }
  })

  const onSubmit = async (data) => {
    await mutateAsync(data)
  }

  if (props.companies?.length === 0) {
    return (
      <div className="flex items-center justify-center">
        <h2>There is no company created ...</h2>
      </div>
    )
  }

  return (
    <div className="pl-10">
      <h1 className='mb-2 text-3xl'>
        Create Office
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="px-2 space-y-2">
          <>
            <Input label="Name" name="name" placeholder="name" type="text" formRef={register({ required: true })} />
            {errors.name && (
              <FormError errorMessage="Name is required" />
            )}
          </>
          <div className="px-2">
            <label className='block font-semibold'>
              Location:
          </label>
            <>
              <Input label="Latitude" name="latitude" placeholder="latitude" type="number" formRef={register({ required: true, min: 1, maxLength: 12 })} />
              {errors.latitude?.type === "required" && (
                <FormError errorMessage="Name is required" />
              )}
              {errors.latitude?.type === "min" && (
                <FormError errorMessage="Should be positive float number" />
              )}
              {errors.latitude?.type === "maxLength" && (
                <FormError errorMessage="Max length is 12" />
              )}
            </>
            <>
              <Input label="Longitude" name="longitude" placeholder="longitude" type="number" formRef={register({ required: true, min: 1, maxLength: 12 })} />
              {errors.longitude?.type === "required" && (
                <FormError errorMessage="Name is required" />
              )}
              {errors.longitude?.type === "min" && (
                <FormError errorMessage="Should be positive float number" />
              )}
              {errors.latitude?.type === "maxLength" && (
                <FormError errorMessage="Max length is 12" />
              )}
            </>
          </div>
          <>
            <Input label="Office Start Date" name="startDate" placeholder="start date" type="text" formRef={register({ required: true })} />
            {errors.date && (
              <FormError errorMessage="Pick the date, please!" />
            )}
          </>
          <div className="px-2">
            <label className='block font-semibold'>
              Company
          </label>
            <select
              className='w-10/12 px-2 py-1 border border-gray-300 rounded-md outline-none'
              type='text'
              name='companyId'
              placeholder='select company'
            >
              {props.companies?.map(c => (
                <option key={c.id} className="capitalize" value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>
        <ButtonForm type="submit" disabled={status === "loading"} disabledTrueStatus="Creating..." disabledFalseStatus="Create" />
      </form>
    </div >
  )
}