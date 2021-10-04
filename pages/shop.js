import Layout from '../components/Layout'
import { getProducts } from './api/products/index'
import ProductList from '../components/ProductList'

const ShopPage = ({ products }) => {
  return (
    <Layout title="All Products">
      <ProductList products={products}/>
    </Layout>
  )
}

export default ShopPage

export async function getStaticProps() {
  const products = await getProducts()
  return { props: { products } }
}