import { useDispatch } from 'react-redux'
import {
  decrementQuantity,
} from '../redux/cartSlice'

const DecrementItemQuantityButton = ({ item }) => {
  const dispatch = useDispatch()
  
  return (
    <button 
      onClick={() => dispatch(decrementQuantity(item.upc))}
      className="border border-yellow-600 hover:bg-yellow-600 hover:text-white w-8 h-8 align-center transition-colors"
    >
      &minus;
    </button>
  )
}

export default DecrementItemQuantityButton