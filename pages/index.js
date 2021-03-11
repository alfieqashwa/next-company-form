import { useState } from 'react'
import { PrismaClient } from '@prisma/client'
import { useForm } from 'react-hook-form'
import Head from 'next/head'

const prisma = new PrismaClient()

const Input = (props) => (
  <div className="">
    <label className="block">{props.label}</label>
    <input className="px-2 py-1 rounded-md" placeholder={props.placeholder} name={props.name} type={props.type} ref={props.formRef} />
  </div>
)

export default function Index({ initialCompanies }) {
  const [companies, setCompanies] = useState(initialCompanies)
  const { register, handleSubmit, errors, watch } = useForm()

  return (
    <>
      <Head>
        <title>Company Form</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-5xl min-h-screen p-20 m-20 mx-auto text-gray-600 bg-gray-300">
        <h1 className='text-2xl text-gray-700'>
          Company Form
        </h1>
        <form className="">
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
        <div className="mt-10">
          <pre>{JSON.stringify(companies, null, 2)}</pre>
        </div>

      </main>

    </>
  )
}

export async function getServerSideProps() {
  const companies = await prisma.company.findMany()
  return { props: { initialCompanies: companies } }
}