import { useForm } from 'react-hook-form';
import { ButtonForm } from './ButtonForm';
import { Input } from './Input';
import { FormError } from './ErrorForm'

export default function OfficeForm(props) {
  const { register, handleSubmit, errors, watch } = useForm()
  return (
    <div className="pl-10">
      <h1 className='mb-2 text-3xl'>
        Create Office
  </h1>
      <form className="px-2">
        <div className="space-y-2">
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
              <input
                className='px-2 py-1 border border-gray-300 rounded-md outline-none'
                type='number'
                name='latitude'
                placeholder='latitude'
                ref={register({ required: true, min: 1 })}
              />
              {errors.latitude?.type === "required" && (
                <FormError errorMessage="Name is required" />
              )}
              {errors.latitude?.type === "min" && (
                <FormError errorMessage="Should be positive float number" />
              )}
            </>
            <>
              <input
                className='px-2 py-1 mt-2 border border-gray-300 rounded-md outline-none'
                type='number'
                name='longitude'
                placeholder='longitude'
                ref={register({ required: true, min: 1 })}
              />
              {errors.longitude?.type === "required" && (
                <FormError errorMessage="Name is required" />
              )}
              {errors.longitude?.type === "min" && (
                <FormError errorMessage="Should be positive float number" />
              )}
            </>
          </div>
          <>
            <Input label="Office Start Date" name="date" placeholder="date" type="text" formRef={register({ required: true })} />
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
              name='code'
              placeholder='select company'
            >
              {props.companies?.map(c => (
                <option key={c.id} className="capitalize" value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>
        <ButtonForm />
      </form>
    </div >
  )
}