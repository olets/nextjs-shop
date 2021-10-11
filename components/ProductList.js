import ProductCard from './ProductCard'

const ProductList = ({ products, showCategory = true }) => (
  <ul className="grid grid-cols-4 gap-5">
    {products.map((product, index) => (
      <li key={index}>
        <ProductCard key={product.id} product={product} showCategory={showCategory} />
      </li>
    ))}
  </ul>
)

export default ProductList