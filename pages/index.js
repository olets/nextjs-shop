import Head from 'next/head'
import CategoryCard from '../components/CategoryCard'
import Header from '../components/Header'

const categories = [
  {
    imageSrc: '/images/dune.jpg',
    name: 'Land',
  },
  {
    imageSrc: '/images/bay.jpg',
    name: 'Water',
  },
  {
    imageSrc: '/images/frog.jpg',
    name: 'Animals',
  },
]

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header></Header>

      <main className="flex-1 p-10 text-center">
        <h1 className="mb-10 text-2xl">
          Next.js Store
        </h1>

        <h2 className="mb-10 text-xl">Categories</h2>

        <ul className="grid grid-cols-3 gap-5">
          {categories.map(({ imageSrc, name }, index) => (
            <li key={index}>
              <CategoryCard imageSrc={imageSrc} name={name} />
            </li>
          ))}
        </ul>
      </main>

      <footer className="border-t p-8 w-full">
        by @olets from the guide at https://blog.logrocket.com/building-a-next-js-shopping-cart-app/
      </footer>
    </div>
  )
}
