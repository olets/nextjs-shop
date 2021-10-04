import Image from 'next/image'

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})

const ProductCard = ({ product }) => {
  return (
    <div className="group shadow">
      <Image className="group-hover:scale-125 transition-transform" src={product.imageSrc} height={300} width={220} />

      <h4 className="font-bold">{product.name}</h4>
      
      <dl>
        <dt>Category: </dt>
        <dd>{product.category}</dd>
        <dt>Price:</dt>
        <dd>{formatter.format(product.price)}</dd>
      </dl>
      
      <button className="hover:shadow hover:bg-blue-700 focus:shadow focus:bg-blue-700 transition-colors bg-blue-400 p-8 py-4 text-white rounded my-8">Add to Cart</button>
    </div>
  )
}

export default ProductCard