import { useForm } from 'react-hook-form'
import { Input } from './Input'

export default function CompanyForm(props) {
  const { register, handleSubmit, errors, watch } = useForm()
  return (
    <div>
      <h1 className='text-3xl'>
        Create Company
        </h1>
      <form onSubmit={handleSubmit(props.onSubmit)}>
        <div className="space-y-2">
          <Input label="Name" name="name" placeholder="name" type="text" formRef={register({ required: true })} />
          <Input label="Address" name="address" placeholder="address" type="text" formRef={register({ required: true })} />
          <Input label="Revenue" name="revenue" placeholder="revenue" type="number" formRef={register({ required: true })} />
          <Input label="Code" name="code" placeholder="code" type="number" formRef={register({ required: true })} />
          <Input label="Phone" name="phone" placeholder="phone no" type="number" formRef={register({ required: true })} />
        </div>
        <div className="mt-6">
          <button className="w-1/3 px-6 py-2 text-gray-100 bg-gray-500 rounded-md" type="submit">Create</button>
        </div>
      </form>
    </div>
  )
}