import cx from 'classnames'
import { useDispatch } from 'react-redux'
import {
  removeFromCart,
  setQuantity,
} from '../redux/cartSlice'

const handleSubmit = (value) => {

}

const UpdateItemQuantityInput = ({ item }) => {
  const dispatch = useDispatch()
  
  return (
    <form>
      <input
        className="border border-gray-400 rounded-sm px-4 py-2 w-20"
        defaultValue={item.quantity}
        onSubmit={(e) => {
          // const { value } = e.target
          handleSubmit(e.target)

          if (value < 1) {
            // TODO would be nice to warn
            dispatch(removeFromCart(item.id))
            return
          }

          dispatch(setQuantity({id: item.id, quantity: value}))
        }}
        type="number"
      />

      <button
        onClick={(e) => {
          e.preventDefault()

          const { value } = e.target.parentElement.querySelector('input')

          if (value < 1) {
            // TODO would be nice to warn
            dispatch(removeFromCart(item.id))
            return
          }

          dispatch(setQuantity({id: item.id, quantity: value}))
        }}
      >
        Update
      </button>
    </form>
  )
}

export default UpdateItemQuantityInput