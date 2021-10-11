import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import ProductList from '../../components/ProductList'
import { getProductsByCategory } from '../api/products/[category]'

const CategoryPage = ({ products }) => {
  const router = useRouter()
  return (
    <Layout title={`Results for ${router.query.category}`}>
      <ProductList products={products} showCategory={true} />
    </Layout>
  )
}

export default CategoryPage

export async function getServerSideProps(ctx) {
  const category = ctx.query.category
  const products = await getProductsByCategory(category)

  // TODO should this be something else?
  if (!products.length) {
    return {
      notFound: true,
    }
  }

  return { props: { products } }
}