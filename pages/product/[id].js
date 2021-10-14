import Layout from '../../components/Layout'
import ProductDetailCard from '../../components/ProductDetailCard'
import { getProductById } from '../api/product/[id]'

const ProductPage = ({ product }) => {
  return (
    <Layout title={`${product.name}`}>
      <ProductDetailCard product={product}></ProductDetailCard>
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