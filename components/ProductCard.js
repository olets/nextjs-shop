import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/cart.slice'
import { CurrencyFormatter } from '../utilities/CurrencyFormatter'

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className="group shadow">
      <Image className="group-hover:scale-125 transition-transform" src={product.imageSrc} height={300} width={220} />

      <h4 className="font-bold">{product.name}</h4>
      
      <dl>
        <dt>Category: </dt>
        <dd>{product.category}</dd>
        <dt>Price:</dt>
        <dd>{CurrencyFormatter.format(product.price)}</dd>
      </dl>
      
      <button
        onClick={() => dispatch(addToCart(product))}
        className="hover:shadow hover:bg-blue-700 focus:shadow focus:bg-blue-700 transition-colors bg-blue-400 p-8 py-4 text-white rounded my-8"
      >
        Add to Cart
      </button>
    </div>
  )
}

export default ProductCard