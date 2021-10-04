import CategoryCard from './CategoryCard'

const ProductList = ({ categories }) => (
  <ul className="grid grid-cols-3 gap-5">
    {categories.map(({ imageSrc, category }, index) => (
      <li key={index}>
        <CategoryCard imageSrc={imageSrc} category={category} />
      </li>
    ))}
  </ul>
)

export default ProductList
