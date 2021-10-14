import cx from 'classnames'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { selectTotalQuantity } from '../redux/cartSlice'

const Header = () => {
  const router = useRouter()
  const cart = useSelector((state) => state.cart)
  const totalQuantity = selectTotalQuantity(cart)

  const headerLinks = [
    {
      href: '/',
      text: 'Home',
      underlineCurrent: false,
    },
    {
      href: '/',
      text: 'Categories',
      underlineCurrent: true,
    },
    {
      href: '/shop',
      text: 'All Products',
      underlineCurrent: true,
    },
    {
      href: '/cart',
      text: `Cart (${totalQuantity})`,
      underlineCurrent: true,
    }
  ]

  return (
    <header className="p-4 w-full">
      <nav>
        <ul className="flex justify-between">
          {headerLinks.map(({ href, text, underlineCurrent }, index) => (
            <li key={index} className={cx({ 'flex-1': index === 0 })}>
              <Link href={href}>
                <a className={ cx('border-current hover:text-link inline-block m-2 transition-colors', {
                  'border-b-2': router.asPath === href && underlineCurrent,
                }) }>
                  {text}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Header