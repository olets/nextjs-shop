import { useDispatch } from 'react-redux'
import {
  removeFromCart,
} from '../redux/cartSlice'

const RemoveItemFromCartButton = ({ item }) => {
  const dispatch = useDispatch()
  
  return (
    <button 
      onClick={() => dispatch(removeFromCart(item.upc))}
      className="border border-red-700 hover:bg-red-700 hover:text-white w-8 h-8 align-center transition-colors"
    >
      &times;
    </button>
  )
}

export default RemoveItemFromCartButton