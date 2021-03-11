import { useForm } from 'react-hook-form'
import { ButtonForm } from './ButtonForm'
import { Input } from './Input'
import { FormError } from './ErrorForm'

export default function CompanyForm(props) {
  const { register, handleSubmit, errors, watch } = useForm()
  return (
    <div className="pl-4 pr-36">
      <h1 className='mb-2 text-3xl'>
        Create Company
        </h1>
      <form onSubmit={handleSubmit(props.onSubmit)}>
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
        <ButtonForm type="submit" />
      </form>
    </div>
  )
}