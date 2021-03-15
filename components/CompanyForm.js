import { useState } from 'react'
import { useQueryClient, useMutation } from 'react-query'
import { useForm } from 'react-hook-form'
import { ButtonForm } from './ButtonForm'
import { Input } from './Input'
import { FormError } from './ErrorForm'

async function createCompany(data) {
  const URL = `${process.env.NEXT_PUBLIC_URL}/api/companies/create`
  const response = await fetch(URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}


export default function CompanyForm() {
  const [errMessage, setErrMessage] = useState("");
  const queryClient = useQueryClient();
  const { handleSubmit, errors, register, reset, clearErrors } = useForm()

  const mutation = useMutation(createCompany, {
    onMutate: async (newCompany) => {
      // mutate in-progress
      // use for: spinner, disbled from, etc

      // Optimitic Update:
      // 1. cancel any outgoing refetch
      await queryClient.cancelQueries("companies")

      // 2. snapshot the previous value
      const previousCompanies = queryClient.getQueryData("companies")

      // 3. optimistically update new value
      if (previousCompanies) {
        newCompany = { ...newCompany }
        const latestCompanies = [...previousCompanies, newCompany]
        queryClient.setQueryData("companies", latestCompanies)
      }
      return { previousCompanies }
    },

    onSettled: async (data, error) => {
      // mutation done --> success, error
      if (data) {
        await queryClient.invalidateQueries("companies")
        setErrMessage("");
        // from react-hook-form
        clearErrors();
        reset();
      }

      if (error) {
        setErrMessage(error.message);
      }
    },
    onError: async (error, _variables, context) => {
      // mutation done with error response
      // console.log("onError");
      setErrMessage(error.message);
      if (context?.previousCompanies) {
        queryClient.setQueryData(
          "companies",
          context.previousMessages
        );
      }
    },
    onSuccess: async () => {
      console.log("onSuccess")
    },
  })

  const onSubmit = async (data) => {
    // mutation done with success response
    await mutation.mutate(data)
  }

  return (
    <div className="pl-4 pr-36">
      <h1 className='mb-2 text-3xl'>
        Create Company
        </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="px-2 space-y-2">
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
          <>
            <Input label="Code" name="code" placeholder="code" type="number" formRef={register({ required: true, min: 1, maxLength: 3 })} />
            {errors.code?.type === "required" && (
              <FormError errorMessage="Code is required" />
            )}
            {errors.code?.type === "min" && (
              <FormError errorMessage="Should be positive integer" />
            )}
            {errors.code?.type === "maxLength" && (
              <FormError errorMessage="max code area is 3" />
            )}
          </>
          <>
            <Input label="Phone" name="phone" placeholder="phone no" type="number" formRef={register({ required: true, min: 1, maxLength: 11 })} />
            {errors.phone?.type === "required" && (
              <FormError errorMessage="Phone is required" />
            )}
            {errors.phone?.type === "min" && (
              <FormError errorMessage="Should be positive integer" />
            )}
            {errors.phone?.type === "maxLength" && (
              <FormError errorMessage="max number is 11" />
            )}
          </>
        </div>
        <ButtonForm type="submit" disabled={!!mutation.onMutate} />
      </form>
    </div>
  )
}