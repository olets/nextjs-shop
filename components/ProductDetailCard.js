
import Image from 'next/image'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/cartSlice'
import { numberToUSDString } from '../utilities/currency'
import Titlecase from '../utilities/Titlecase'

const ProductDetailCard = ({ product }) => {
  const dispatch = useDispatch();
  const {
    categories,
    image,
    name,
    price,
    taxes,
  } = product

  return (
    <div className="group shadow relative pb-4 space-y-4">
      <Image
        className="group-hover:scale-125 transition-transform object-fill"
        height={240}
        src={image}
        width={320}
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
                    <a className="focus:text-link-hover hover:text-link-hover text-link underline">{Titlecase(c)}</a>
                  </Link>
                </li>
              ))
            }
          </ul>
        </dd>
        
        <dt>Price:</dt>
        <dd className="mb-8">{numberToUSDString(price)}</dd>
        
        <dt>Taxes:</dt>
        <dd className="mb-8">{numberToUSDString(taxes)}</dd>
      </dl>
      
      <button
        onClick={() => dispatch(addToCart(product))}
        className="bg-link focus:bg-link-hover focus:ring-4 focus:shadow hover:bg-link-hover hover:shadow p-8 py-4 rounded text-white transition-colors"
      >
        Add to Cart
      </button>
    </div>
  )
}

export default ProductDetailCard