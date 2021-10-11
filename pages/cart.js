import { useState } from 'react'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import Image from 'next/image'
import Link from 'next/link'
import Layout from '../components/Layout'
import { useSelector, useDispatch } from 'react-redux'
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from '../redux/cart.slice'
import { CurrencyFormatter } from '../utilities/CurrencyFormatter'

const ALLOWED_COUNTRY_CODES = ['US']

const PAYPAL_OPTIONS = {
  "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
  currency: "USD",
  intent: "capture",
}

const CartPage = () => {
  const cart = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  const [state, setState] = useState({
    orderID: null,
    approveMessage: "",
    errorMessage: "",
  })

  const itemTotalValue = cart.reduce((accumulator, item) => {
    return accumulator + item.quantity * item.price
  }, 0)

  const shippingValue = 10 // @TODO

  const taxTotalValue = 20 // @TODO

  const grandTotalValue = itemTotalValue + shippingValue + taxTotalValue

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [{
          description: 'the description',
          amount: {
            currency_code: 'USD',
            value: grandTotalValue,
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: itemTotalValue,
              },
              shipping: {
                currency_code: 'USD',
                value: shippingValue,
              },
              tax_total: {
                currency_code: 'USD',
                value: taxTotalValue,
              }
            }
          },
          items: cart.map(m => ({
            name: m.name,
            unit_amount: {
              currency_code: 'USD',
              value: m.price,
            },
            quantity: m.quantity,
          }))
        }]
      })
      .then((orderID) => {
        setState({
          ...state,
          orderID: orderID,
        })
        return orderID
      })
  }

  const onApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      setState({
        ...state,
        approveMessage: `Transaction completed!`
      })
    })
  }

  const onError = (err) => {
    setState({
      ...state,
      errorMessage: err.toString()
    })
  }

  const onShippingChange = (data, actions) => {
    const allowed = ALLOWED_COUNTRY_CODES.includes(data.shipping_address.country_code)

    if (!allowed) {
      return actions.reject()
    }
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
                <th className="p-4">Product</th>
                <th className="p-4">Image</th>
                <th className="p-4">Price</th>
                <th className="p-4">Quantity</th>
                <th className="p-4">Total Price</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
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
                  <td>{CurrencyFormatter.format(item.price)}</td>
                  <td>{item.quantity}</td>
                  <td>{CurrencyFormatter.format(item.quantity * item.price)}</td>
                  <td className="space-x-3">
                    <button 
                      onClick={() => dispatch(incrementQuantity(item.upc))}
                      className="border border-green-700 hover:bg-green-700 hover:text-white w-8 h-8 align-center transition-colors"
                    >
                      &#43;
                    </button>
                    <button 
                      onClick={() => dispatch(decrementQuantity(item.upc))}
                      className="border border-yellow-600 hover:bg-yellow-600 hover:text-white w-8 h-8 align-center transition-colors"
                    >
                      &minus;
                    </button>
                    <button 
                      onClick={() => dispatch(removeFromCart(item.upc))}
                      className="border border-red-700 hover:bg-red-700 hover:text-white w-8 h-8 align-center transition-colors"
                    >
                      &times;
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div>Subtotal: {itemTotalValue}</div>
          <div>Shipping: {shippingValue}</div>
          <div>Tax: {taxTotalValue}</div>
          <div>Total: {grandTotalValue}</div>

          <Link href="/shop">
            <a className="border-b border-current hover:text-link-hover text-link transition-color">Continue Shopping</a>
          </Link>

          <PayPalScriptProvider options={PAYPAL_OPTIONS}>
            <section>
              <dl>
                <dt>Order ID:</dt>
                <dd>{state.orderID}</dd>

                <dt>On Approve Message: </dt>
                <dd>{state.approveMessage}</dd>

                <dt>On Error Message: </dt>
                <dd>{state.errorMessage}</dd>
              </dl>
            </section>

            <PayPalButtons
              createOrder={createOrder}
              forceReRender={[cart]}
              onApprove={onApprove}
              onError={onError}
              onShippingChange={onShippingChange}
            />
          </PayPalScriptProvider>
        </>
      )}
    </Layout>
  )
}

export default CartPage