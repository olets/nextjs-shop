
import Image from 'next/image'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/cart.slice'
import { CurrencyFormatter } from '../utilities/CurrencyFormatter'

const ProductCard = ({ product, showCategory }) => {
  const dispatch = useDispatch();
  const {categories} = product

  return (
    <div className="group shadow relative pb-4 space-y-4">
      <Image
        className="group-hover:scale-125 transition-transform object-fill"
        src={product.image}
        width={320}
        height={240}
      />

      <h4 className="font-bold mt-4">{product.name}</h4>

      <dl>
        <dt>Categories: </dt>
        <dd className="mb-8">
          <ul className="list-disc w-1/2 mx-auto">
            {
              product.categories.sort((a, b) => a.localeCompare(b)).map((c, index) => (
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
        <dd className="mb-8">{CurrencyFormatter.format(product.price)}</dd>
      </dl>

      <Link href={`/product/${product.name}`}>
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