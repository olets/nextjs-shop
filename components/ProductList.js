import ProductCard from './ProductCard'

const ProductList = ({ products, hideCategory = false }) => (
  <ul className="grid grid-cols-4 gap-5">
    {products.map((product, index) => (
      <li key={index}>
        <ProductCard key={product.id} product={product} hideCategory={hideCategory} />
      </li>
    ))}
  </ul>
)

export default ProductList