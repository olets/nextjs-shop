import cx from 'classnames'
import Link from 'next/link'

const links = [
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
  return (
    <header className="p-4 w-full">
      <nav>
        <ul className="flex justify-between">
          {links.map((link, index) => (
            <li key={link.href} className={cx({ 'flex-1': index === 0 })}>
              <Link href={link.href}>
                <a className="border-b-2 border-current duration-200 hover:text-blue-600 inline-block m-2 transition-colors">{link.text}</a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Header