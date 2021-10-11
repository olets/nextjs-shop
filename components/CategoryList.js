import CategoryCard from './CategoryCard'

const CategoryList = ({ data }) => (
  <ul className="grid grid-cols-3 gap-5">
    {data.map((datum, index) => (
      <li key={index}>
        <CategoryCard data={datum} />
      </li>
    ))}
  </ul>
)

export default CategoryList
