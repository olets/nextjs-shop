import Image from 'next/image'
import Link from 'next/link'
import Layout from '../components/Layout'
import { useSelector } from 'react-redux'
import {
  selectAmountValue,
  selectItemTotalValue,
  selectShippingValue,
  selectTaxTotalValue,
} from '../redux/cartSlice'
import { numberToUSDString } from '../utilities/currency'
import UpdateItemQuantityInput from '../components/UpdateItemQuantityInput'
import IncrementItemQuantityButton from '../components/IncrementItemQuantityButton'
import DecrementItemQuantityButton from '../components/DecrementItemQuantityButton'
import RemoveItemFromCartButton from '../components/RemoveItemFromCartButton'
import PayPalCheckout from '../components/PayPalCheckout'

const CartPage = () => {
  const cart = useSelector((state) => state.cart)
  const amountValue = selectAmountValue(cart)
  const itemTotalValue = selectItemTotalValue(cart)
  const shippingValue = selectShippingValue(cart)
  const taxTotalValue = selectTaxTotalValue(cart)

  return (
    <Layout title="Cart">
      {cart.items.length === 0 ? (
        <h1>Your Cart is Empty!</h1>
      ) : (
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
              {cart.items.map((item, index) => (
                <tr key={index}>
                  <td>
                    <Link href={`/product/${item.name}`}>
                      <a>{item.name}</a>
                    </Link>
                  </td>
                  <td>
                    <Link href={`/product/${item.name}`}>
                      <a><Image src={item.image} height="48" width="64" alt=""/></a>
                    </Link>
                  </td>
                  <td>{numberToUSDString(item.price)}</td>
                  <td>{item.quantity}</td>
                  <td>{numberToUSDString(item.quantity * item.price)}</td>
                  <td className="space-x-3">
                    <UpdateItemQuantityInput item={item}></UpdateItemQuantityInput>
                    <IncrementItemQuantityButton item={item}></IncrementItemQuantityButton>
                    <DecrementItemQuantityButton item={item}></DecrementItemQuantityButton>
                    <RemoveItemFromCartButton item={item}></RemoveItemFromCartButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div>Subtotal: {numberToUSDString(itemTotalValue)}</div>
          <div>Shipping: {numberToUSDString(shippingValue)}</div>
          <div>Tax: {numberToUSDString(taxTotalValue)}</div>
          <div>Total: {numberToUSDString(amountValue)}</div>

          <Link href="/shop">
            <a className="border-b border-current hover:text-link-hover text-link transition-color">Continue Shopping</a>
          </Link>

          <PayPalCheckout></PayPalCheckout>
        </>
      )}
    </Layout>
  )
}

export default CartPage