// should update to follow https://dequeuniversity.com/library/aria/shopping-cart

import Image from 'next/image'
import { useDispatch } from 'react-redux'
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from '../redux/cart.slice'
import { CurrencyFormatter } from '../utilities/CurrencyFormatter'

const CartSummary = ({ cart, itemTotalValue }) => {
  const dispatch = useDispatch()

  return (
    <>
      <table>
        <thead>
          <tr>
            <th className="p-4">Product</th>
            <th className="p-4">Image</th>
            <th className="p-4">Price</th>
            <th className="p-4">Quantity</th>
            <th className="p-4">Total Price</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr>
              <td>{item.name}</td>
              <td>
                <Image src={item.imageSrc} height="90" width="65" alt=""/>
              </td>
              <td>{CurrencyFormatter.format(item.price)}</td>
              <td>{item.quantity}</td>
              <td>{CurrencyFormatter.format(item.quantity * item.price)}</td>
              <td className="space-x-3">
                <button 
                  onClick={() => dispatch(incrementQuantity(item.id))}
                  className="border border-green-700 hover:bg-green-700 hover:text-white w-8 h-8 align-center transition-colors"
                >
                  &#43;
                </button>
                <button 
                  onClick={() => dispatch(decrementQuantity(item.id))}
                  className="border border-yellow-600 hover:bg-yellow-600 hover:text-white w-8 h-8 align-center transition-colors"
                >
                  &minus;
                </button>
                <button 
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="border border-red-700 hover:bg-red-700 hover:text-white w-8 h-8 align-center transition-colors"
                >
                  &times;
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 className="my-5">Grand Total: {CurrencyFormatter.format(itemTotalValue)}</h2>
    </>
  )
}

export default CartSummary