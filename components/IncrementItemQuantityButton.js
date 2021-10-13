import { useDispatch } from 'react-redux'
import {
  incrementQuantity,
} from '../redux/cartSlice'

const IncrementItemQuantityButton = ({ item }) => {
  const dispatch = useDispatch()
  
  return (
    <button 
      onClick={() => dispatch(incrementQuantity(item.upc))}
      className="border border-green-700 hover:bg-green-700 hover:text-white w-8 h-8 align-center transition-colors"
    >
      &#43;
    </button>
  )
}

export default IncrementItemQuantityButton