import Layout from '../components/Layout'
import CategoryList from '../components/CategoryList'
import { getProducts } from './api/products/index'
import { getCategoryThumbnail } from './api/products/[category]'

export default function Home({ products }) {
  const categories = [... new Set(products.reduce((acc, {categories}) => [...acc, ...categories], []))]
  const categoriesAndImages = categories.map(c => ({
    category: c,
    image: getCategoryThumbnail(c)
  }))

  return (
    <Layout>
      <h2 className="mb-10 text-xl">Categories</h2>
      <CategoryList data={categoriesAndImages}/>
    </Layout>
  )
}

export async function getStaticProps() {
  const products = await getProducts()
  return { props: { products } }
}