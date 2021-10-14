import ProductListingCard from './ProductListingCard'

const ProductList = ({ products }) => (
  <ul className="grid grid-cols-4 gap-5">
    {products.map((product, index) => (
      <li key={index}>
        <ProductListingCard key={product.id} product={product} />
      </li>
    ))}
  </ul>
)

export default ProductList