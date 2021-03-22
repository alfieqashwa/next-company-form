import { useMutation, useQueryClient } from 'react-query'
import { useForm } from 'react-hook-form'
import { ButtonForm } from './ButtonForm'
import { Input } from './Input'
import { FormError } from './ErrorForm'
import { TitleForm } from './TitleForm'
import { createCompany } from '../lib/api'

export default function CompanyForm() {

  const queryClient = useQueryClient();
  const { handleSubmit, errors, register, reset, clearErrors } = useForm()

  const { status, mutateAsync } = useMutation(createCompany, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("companies");
      clearErrors();
      reset();
    }
  })

  const onSubmit = async (data) => {
    // mutation done with success response
    await mutateAsync(data)
  }

  return (
    <div className="">
      <TitleForm title="Create Company" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="px-2 mb-8 space-y-2">
          <>
            <Input label="Name" name="name" placeholder="name" type="text" formRef={register({ required: true })} />
            {errors.name && (
              <FormError errorMessage="Name is required" />
            )}
          </>
          <>
            <Input label="Address" name="address" placeholder="address" type="text" formRef={register({ required: true, maxLength: 50 })} />
            {errors.address?.type === "required" && (
              <FormError errorMessage="Address is required" />
            )}
            {errors.address?.type === "maxLength" && (
              <FormError errorMessage="Should not more than 50 characters" />
            )}
          </>
          <>
            <Input label="Revenue" name="revenue" placeholder="revenue" type="number" formRef={register({ required: true, min: 1, maxLength: 9 })} />
            {errors.revenue?.type === "required" && (
              <FormError errorMessage="Revenue is required" />
            )}
            {errors.revenue?.type === "min" && (
              <FormError errorMessage="Should be positive floor number" />
            )}
            {errors.revenue?.type === "maxLength" && (
              <FormError errorMessage="max length is 9 number" />
            )}
          </>
          <div>
            <label className="block font-semibold">Phone No:</label>
            <div className="flex space-x-5">
              <div className="space-y-1">
                <input className="w-16 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset" placeholder="code" name="code" type="number" ref={register({ required: true, min: 1, maxLength: 3 })} />
                {errors.code?.type === "required" && (
                  <FormError errorMessage="Code is required" />
                )}
                {errors.code?.type === "min" && (
                  <FormError errorMessage="Should be positive integer" />
                )}
                {errors.code?.type === "maxLength" && (
                  <FormError errorMessage="max code area is 3" />
                )}
              </div>
              <div className="space-y-1">
                <input className="px-2 py-1 border border-gray-300 rounded-md w-60 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset" placeholder="phone no" name="phone" type="number" ref={register({ required: true, min: 1, maxLength: 11 })} />
                {errors.code?.type === "required" && (
                  <FormError errorMessage="Code is required" />
                )}
                {errors.code?.type === "min" && (
                  <FormError errorMessage="Should be positive integer" />
                )}
                {errors.code?.type === "maxLength" && (
                  <FormError errorMessage="max code area is 11" />
                )}
              </div>
            </div>
          </div>
        </div>
        <ButtonForm type="submit" disabled={status === "loading"} disabledTrueStatus="Creating..." disabledFalseStatus="Create" />
      </form>
    </div>
  )
}