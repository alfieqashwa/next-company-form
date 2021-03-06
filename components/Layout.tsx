import { ReactNode } from 'react';
import Head from 'next/head';

export default function Layout({ title, main }: ILayout) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel='icon' href='/favicon.ico' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <main className='max-w-4xl min-h-screen px-6 py-4 mx-auto text-gray-500 border-2 border-gray-300 divide-y-2 divide-gray-300 md:my-10 rounded-xl'>
        {main}
      </main>
    </>
  );
}

type ILayout = { title: string; main: ReactNode };
