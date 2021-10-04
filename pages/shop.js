import ProductCard from '../components/ProductCard'
import Layout from '../components/Layout'
import { getProducts } from './api/products/index'

const ShopPage = ({ products }) => {
  return (
    <Layout title="All Products">
      <ul className="grid grid-cols-4 gap-5">
        {products.map((product, index) => (
          <li key={index}>
            <ProductCard key={product.id} product={product} />
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default ShopPage

export async function getStaticProps() {
  const products = await getProducts()
  return { props: { products } }
}