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
            <Input label="Address" name="address" placeholder="address" type="text" formRef={register({ required: true })} />
            {errors.address && (
              <FormError errorMessage="Address is required" />
            )}
          </>
          <>
            <Input label="Revenue" name="revenue" placeholder="revenue" type="number" formRef={register({ required: true, min: 1 })} />
            {errors.revenue?.type === "required" && (
              <FormError errorMessage="Revenue is required" />
            )}
            {errors.revenue?.type === "min" && (
              <FormError errorMessage="Should be positive floor number" />
            )}
          </>
          <>
            <Input label="Code" name="code" placeholder="code" type="number" formRef={register({ required: true, min: 1 })} />
            {errors.code?.type === "required" && (
              <FormError errorMessage="Code is required" />
            )}
            {errors.code?.type === "min" && (
              <FormError errorMessage="Should be positive integer" />
            )}
          </>
          <>
            <Input label="Phone" name="phone" placeholder="phone no" type="number" formRef={register({ required: true, min: 1 })} />
            {errors.phone?.type === "required" && (
              <FormError errorMessage="Phone is required" />
            )}
            {errors.phone?.type === "min" && (
              <FormError errorMessage="Should be positive integer" />
            )}
          </>
        </div>
        <ButtonForm />
      </form>
    </div>
  )
}