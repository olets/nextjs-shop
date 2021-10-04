import Head from 'next/head'
import CategoryCard from '../components/CategoryCard'
import Header from '../components/Header'
import Layout, { siteTitle } from '../components/Layout'

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
    <Layout>
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
    </Layout>
  )
}
