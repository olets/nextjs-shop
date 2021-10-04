import Layout from '../components/Layout'
import CategoryList from '../components/CategoryList'
import { getProducts } from './api/products/index'

export default function Home({ products }) {
  const categories = [...new Set(products.map(p => p.category))]
    .map(c => ({
      imageSrc: products.find(p => p.category === c).imageSrc,
      category: c,
    }))

  return (
    <Layout>
      <h2 className="mb-10 text-xl">Categories</h2>

      <CategoryList categories={categories}/>
    </Layout>
  )
}

export async function getStaticProps() {
  const products = await getProducts()
  return { props: { products } }
}