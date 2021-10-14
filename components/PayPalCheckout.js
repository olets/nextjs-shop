import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import { useDispatch, useSelector } from 'react-redux'
import {
  selectAmountValue,
  selectItemTotalValue,
  selectShippingValue,
  selectTaxTotalValue,
  updateApproveMessage,
  updateErrorMessage,
  updateOrderID,
} from '../redux/cartSlice'
import { numberToUSDNumber } from '../utilities/currency'

const ALLOWED_COUNTRY_CODES = ['US']
const PAYPAL_OPTIONS = {
  "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
  currency: "USD",
  intent: "capture",
}

const PayPalCheckout = ({}) => {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)

  const createOrder = (data, actions) => {
    const amountValue = selectAmountValue(cart)
    const itemTotalValue = selectItemTotalValue(cart)
    const shippingValue = selectShippingValue(cart)
    const taxTotalValue = selectTaxTotalValue(cart)

    const order = {
      purchase_units: [{
        description: 'the description',
        amount: {
          currency_code: 'USD',
          value: numberToUSDNumber(amountValue),
          breakdown: {
            item_total: {
              currency_code: 'USD',
              value: numberToUSDNumber(itemTotalValue),
            },
            shipping: {
              currency_code: 'USD',
              value: numberToUSDNumber(shippingValue),
            },
            tax_total: {
              currency_code: 'USD',
              value: numberToUSDNumber(taxTotalValue),
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