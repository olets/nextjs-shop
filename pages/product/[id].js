import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import ProductCard from '../../components/ProductCard'
// import ProductList from '../../components/ProductList'
import { getProductById } from '../api/product/[id]'

const ProductPage = ({ product }) => {
  // const router = useRouter()

  return (
    <Layout title={`${product.name}`}>
      <ProductCard product={product}></ProductCard>
    </Layout>
  )
}

export default ProductPage

export async function getServerSideProps(ctx) {
  const id = ctx.query.id
  const product = await getProductById(id)

  if (!product) {
    return {
      notFound: true,
    }
  }

  return { props: { product } }
}