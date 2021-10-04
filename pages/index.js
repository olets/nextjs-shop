import Head from 'next/head'
import Header from '../components/Header'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header></Header>

      <main className="flex-1 p-10 text-center">
        <h1 className="text-2xl font-bold">
          Next.js Store
        </h1>

        content
      </main>

      <footer className="border-t p-8 w-full">
        by @olets from the guide at https://blog.logrocket.com/building-a-next-js-shopping-cart-app/
      </footer>
    </div>
  )
}
