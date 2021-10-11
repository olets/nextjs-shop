import Layout from '../components/Layout'
import CategoryList from '../components/CategoryList'
import { getCategories } from '../pages/api/categories/index'

export default function Home({ categories }) {
  return (
    <Layout>
      <h2 className="mb-10 text-xl">Categories</h2>
      <CategoryList categories={categories}></CategoryList>
    </Layout>
  )
}

export async function getStaticProps() {
  const categories = await getCategories()
  return { props: { categories } }
}