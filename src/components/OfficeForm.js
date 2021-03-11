import { useForm } from 'react-hook-form';
import { ButtonForm } from './ButtonForm';
import { Input } from './Input';

export default function OfficeForm() {
  const { register, handleSubmit, errors, watch } = useForm()
  return (
    <div className="pl-10">
      <h1 className='mb-2 text-3xl'>
        Create Office
  </h1>
      <form className="px-2">
        <div className="space-y-2">
          <Input label="Name" name="name" placeholder="name" type="text" formRef={register({ required: true })} />
          <Input label="Address" name="address" placeholder="address" type="text" formRef={register({ required: true })} />
          <Input label="Revenue" name="revenue" placeholder="revenue" type="number" formRef={register({ required: true })} />
          <Input label="Code" name="code" placeholder="code" type="number" formRef={register({ required: true })} />
          <Input label="Phone" name="phone" placeholder="phone no" type="number" formRef={register({ required: true })} />
        </div>
        <ButtonForm />
      </form>
    </div>
  )
}