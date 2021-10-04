import cx from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'

const headerLinks = [
  {
    href: '/',
    text: 'Home',
  },
  {
    href: '/shop',
    text: 'Shop',
  },
  {
    href: '/cart',
    text: 'Cart',
  }
]

const Header = () => {
  const router = useRouter()

  return (
    <header className="p-4 w-full">
      <nav>
        <ul className="flex justify-between">
          {headerLinks.map(({ href, text }, index) => (
            <li key={href} className={cx({ 'flex-1': index === 0 })}>
              <Link href={href}>
                <a className={ cx('border-current hover:text-link inline-block m-2 transition-colors', {
                    'border-b-2': router.asPath === href,
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