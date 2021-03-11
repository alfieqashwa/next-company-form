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

  async function saveCompany(company) {
    const response = await fetch('/api/companies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(company)
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return await response.json();
  }

  const onSubmit = async (data, e) => {
    try {
      await saveCompany(data)
      setCompanies([...companies, data])
      e.target.reset()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Head>
        <title>Company Form</title>
        <link rel="icon" href="/favicon.ico" />
        {/* <meta http-equiv="origin-trial" content="Aurd7QTib2GQwZ/6a4/dy7EflimWWZZQv96Bu7T4rH6KcbovVc2FyuPcrt/3By+2N/FfZcuo2Sq6/vECize1wQsAAABgeyJvcmlnaW4iOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJmZWF0dXJlIjoiVW5yZXN0cmljdGVkU2hhcmVkQXJyYXlCdWZmZXIiLCJleHBpcnkiOjE2MzM0NzgzOTl9"></meta> */}
      </Head>

      <main className="max-w-5xl min-h-screen p-20 m-20 mx-auto text-gray-600 bg-gray-300">
        <h1 className='text-2xl text-gray-700'>
          Company Form
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
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