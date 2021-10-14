import Link from 'next/link'
import Layout from '../components/Layout'
import { useSelector } from 'react-redux'
import CartSummary from '../components/CartSummary'
import PayPalCheckout from '../components/PayPalCheckout'

const CartPage = () => {
  const cart = useSelector((state) => state.cart)

  return (
    <Layout title="Cart">
      {cart.items.length === 0 ? (
        <h1>Your Cart is Empty!</h1>
      ) : (
        <>
          <CartSummary></CartSummary>

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