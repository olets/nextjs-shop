import data from '../../../data/products.json'

export function getProductById(id) {
  const product = data.find((p) => p.name == id)
  return product
}

export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({ message: `Method ${req.method} is not allowed` })
  } else {
    const product = getProductById(req.query.id)
    res.status(200).json(product)
  }
}