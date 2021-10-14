import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import { useDispatch, useSelector } from 'react-redux'
import {
  updateApproveMessage,
  updateErrorMessage,
  updateOrderID,
} from '../redux/cartSlice'
import { numberToUSD, USDToNumber } from '../utilities/currency'

const ALLOWED_COUNTRY_CODES = ['US']
const PAYPAL_OPTIONS = {
  "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
  currency: "USD",
  intent: "capture",
}

const PayPalCheckout = ({}) => {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)

  // TODO use Redux selectors for itemTotalValue, shippingValue, taxTotalValue, grandTotalValue
    const itemTotalValue = cart.items.reduce((accumulator, item) => {
      return accumulator + item.quantity * item.price
    }, 0)

    const shippingValue = 10 // @TODO

    const taxTotalValue = 20 // @TODO

    const grandTotalValue = itemTotalValue + shippingValue + taxTotalValue

  const createOrder = (data, actions) => {
    const order = {
      purchase_units: [{
        description: 'the description',
        amount: {
          currency_code: 'USD',
          value: USDToNumber(numberToUSD(grandTotalValue)),
          breakdown: {
            item_total: {
              currency_code: 'USD',
              value: USDToNumber(numberToUSD(itemTotalValue)),
            },
            shipping: {
              currency_code: 'USD',
              value: USDToNumber(numberToUSD(shippingValue)),
            },
            tax_total: {
              currency_code: 'USD',
              value: USDToNumber(numberToUSD(taxTotalValue)),
            }
          }
        },
        items: cart.items.map(m => ({
          name: m.name,
          unit_amount: {
            currency_code: 'USD',
            value: m.price,
          },
          quantity: m.quantity,
        }))
      }]
    }
    console.log(order)
    return actions.order
      .create(order)
      .then((orderID) => {
        dispatch(updateApproveMessage(''))
        dispatch(updateErrorMessage(''))
        dispatch(updateOrderID(orderID))

        return orderID
      })
  }

  const onApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      dispatch(updateApproveMessage('Transaction completed!'))
    })
  }

  const onError = (err) => {
    dispatch(updateErrorMessage(err.toString()))
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
          <dd>{cart.orderID}</dd>

          <dt>On Approve Message: </dt>
          <dd>{cart.approveMessage}</dd>

          <dt>On Error Message: </dt>
          <dd>{cart.errorMessage}</dd>
        </dl>
      </section>

      <PayPalButtons
        createOrder={createOrder}
        forceReRender={[cart.items]}
        onApprove={onApprove}
        onError={onError}
        onShippingChange={onShippingChange}
      />
    </PayPalScriptProvider>
  )
}

export default PayPalCheckout