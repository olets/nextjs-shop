import { useDispatch } from 'react-redux'
import {
  removeFromCart,
  setQuantity,
} from '../redux/cartSlice'

const UpdateItemQuantityInput = ({ item }) => {
  const dispatch = useDispatch()
  
  return (
    <input
      className="border border-gray-400 rounded-sm px-4 py-2 w-20"
      type="number"
      value={item.quantity}
      onChange={(e) => {
        const { value } = e.target

        if (value === 0) {
          // TODO would be nice to warn
          dispatch(removeFromCart(item.id))
          return
        }

        dispatch(setQuantity({id: item.id, quantity: value}))
      }}
    />
  )
}

export default UpdateItemQuantityInput