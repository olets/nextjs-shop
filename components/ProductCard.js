
import Image from 'next/image'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/cartSlice'
import { numberToUSDString } from '../utilities/currency'

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const {
    categories,
    image,
    name,
    price
  } = product

  return (
    <div className="group shadow relative pb-4 space-y-4">
      <Image
        className="group-hover:scale-125 transition-transform object-fill"
        src={image}
        width={320}
        height={240}
      />

      <h4 className="font-bold mt-4">{name}</h4>

      <dl>
        <dt>Categories: </dt>
        <dd className="mb-8">
          <ul className="list-disc w-1/2 mx-auto">
            {
              categories.sort((a, b) => a.localeCompare(b)).map((c, index) => (
                <li key={index}>
                  <Link href={`/category/${c}`}>
                    <a>{c}</a>
                  </Link>
                </li>
              ))
            }
          </ul>
        </dd>
        
        <dt>Price:</dt>
        <dd className="mb-8">{numberToUSDString(price)}</dd>
      </dl>

      <Link href={`/product/${name}`}>
        <a className="block">
          See details
        </a>
      </Link>
      
      <button
        onClick={() => dispatch(addToCart(product))}
        className="hover:shadow hover:bg-blue-700 focus:shadow focus:bg-blue-700 transition-colors bg-blue-400 p-8 py-4 text-white rounded"
      >
        Add to Cart
      </button>
    </div>
  )
}

export default ProductCard