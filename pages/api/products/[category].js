import data from '../../../data/products.json'

export function getProductsByCategory(category) {
  const products = data.filter(({categories}) => categories.indexOf(category) >= 0)
  return products
}

export function getCategoryThumbnail(category) {
  const thumbnail = getProductsByCategory(category)[0].image
  return thumbnail
}

export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({ message: `Method ${req.method} is not allowed` })
  } else {
    const products = getProductsByCategory(req.query.category)
    res.status(200).json(products)
  }
}