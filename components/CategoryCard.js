import Link from 'next/link'
import Image from 'next/image'
import Titlecase from '../utilities/Titlecase'

const LINK_TEXT = 'See Products'

const CategoryCard = ({ category }) => {
  const { name, image } = category
  return (
    <div className="group hover:text-link relative transition-colors">
      <Image
        alt=""
        className="object-cover border group-hover:scale-125 transition-transform"
        height={240}
        src={image}
        width={320}
      />

      <h3>{Titlecase(name)}</h3>
      <p aria-hidden="true" className="focus:text-link-hover hover:text-link-hover text-link underline uppercase">{LINK_TEXT}</p>

      <Link href={`/category/${name.toLowerCase()}`}>
        <a className="absolute h-full left-0 top-0 w-full">
          <div className="sr-only">{LINK_TEXT}</div>
        </a>
      </Link>
    </div>
  )
}

export default CategoryCard
