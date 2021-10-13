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

  // export default connect(CategoryList)
// const mapState = (state, ownProps) => {
//   const item = selectItemForThisComponent(state, ownProps.itemId);

//   return {item};
// }

// const SomeComponent = (props) => <div>Name: {props.item.name}</div>;

// export default connect(mapState)(SomeComponent);