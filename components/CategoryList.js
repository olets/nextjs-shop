import CategoryCard from './CategoryCard'

const CategoryList = ({ categories }) => (
  <ul className="grid grid-cols-3 gap-5">
    {categories.map((category, index) => (
      <li key={index}>
        <CategoryCard category={category} />
      </li>
    ))}
  </ul>
)

export default CategoryList
