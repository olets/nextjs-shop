import data from '../../../data/products.json'
import { getProductsByCategory } from '../products/[category]'

export function getCategoryImage(category) {
  const thumbnail = getProductsByCategory(category)[0].image
  return thumbnail
}

export function getCategories() {
  let ret = [... new Set(
    data.reduce((acc, {categories}) => (
      [...acc, ...categories]
    ), [])
  )].map(c => ({
    name: c,
    image: getCategoryImage(c),
  }))

  return ret
}

export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({ message: `Method ${req.method} is not allowed` })
  } else {
    const products = getProducts()
    res.status(200).json(products)
  }
}