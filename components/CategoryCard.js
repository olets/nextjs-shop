import Link from 'next/link'
import Image from 'next/image'
import Titlecase from '../utilities/Titlecase'

const LINK_TEXT = 'See All'

const CategoryCard = ({ category }) => {
  const { name, image } = category
  return (
    <div className="group hover:text-link relative transition-colors">
      <Image className="object-cover border group-hover:scale-125 transition-transform" src={image} height={700} width={1300} alt="" />

      <h3>{Titlecase(name)}</h3>
      <p aria-hidden="true" className="uppercase">{LINK_TEXT}</p>

      <Link href={`/category/${name.toLowerCase()}`}>
        <a className="absolute h-full left-0 top-0 w-full">
          <div className="sr-only">{LINK_TEXT}</div>
        </a>
      </Link>
    </div>
  )
}

export default CategoryCard
