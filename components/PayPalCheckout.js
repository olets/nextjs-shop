import { useState } from 'react'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import { useSelector } from 'react-redux'

const ALLOWED_COUNTRY_CODES = ['US']
const PAYPAL_OPTIONS = {
  "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
  currency: "USD",
  intent: "capture",
}

const PayPalCheckout = ({}) => {
  const cart = useSelector((state) => state.cart)

  const [state, setState] = useState({
    orderID: null,
    approveMessage: "",
    errorMessage: "",
  })

  // TODO use Redux selectors for itemTotalValue, shippingValue, taxTotalValue, grandTotalValue

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
  )
}

export default PayPalCheckout