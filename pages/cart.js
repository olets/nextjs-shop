import Image from 'next/image'
import Layout from '../components/Layout'
import { useSelector, useDispatch } from 'react-redux'
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from '../redux/cart.slice'
import { CurrencyFormatter } from '../utilities/CurrencyFormatter'

const CartPage = () => {
  const cart = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  const getTotalPrice = () => {
    return cart.reduce(
      (accumulator, item) => accumulator + item.quantity * item.price,
      0
    )
  }

  return (
    <Layout title="Cart">
      {cart.length === 0 ? (
        <h1>Your Cart is Empty!</h1>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Image</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Actions</th>
                <th>Total Price</th>
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
                  <td className="space-x-3">
                    <button 
                      onClick={() => dispatch(incrementQuantity(item.id))}
                      className="bg-green-700 text-white w-8 h-8 align-center"
                    >
                      &#43;
                    </button>
                    <button 
                      onClick={() => dispatch(decrementQuantity(item.id))}
                      className="bg-yellow-600 text-white w-8 h-8 align-center"
                    >
                      &minus;
                    </button>
                    <button 
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="bg-red-700 text-white w-8 h-8 align-center"
                    >
                      x
                    </button>
                  </td>
                  <td>{CurrencyFormatter.format(item.quantity * item.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h2>Grand Total: {CurrencyFormatter.format(getTotalPrice())}</h2>
        </>
      )}
    </Layout>
  )
}

export default CartPage