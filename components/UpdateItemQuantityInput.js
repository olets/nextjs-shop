import { useDispatch } from 'react-redux'
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from '../redux/cartSlice'

const UpdateItemQuantityInput = ({ item }) => {
  const dispatch = useDispatch()
  
  return (
    <input
      type="number"
      value={item.quantity}
      onChange={(e) => {
        const { value } = e.target

        if (value === 0) {
          // TODO would be nice to warn
          dispatch(removeFromCart(item.upc))
        } else if (value > item.quantity) {
          dispatch(incrementQuantity(item.upc))
        } else {
          dispatch(decrementQuantity(item.upc))
        }
      }}
    />
  )
}

export default UpdateItemQuantityInput