import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    approveMessage: '',
    errorMessage: '',
    items: [],
    orderID: null,
  },
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.items.find(({ id }) => id === action.payload.id)

      if (!itemInCart) {
        state.items.push({ ...action.payload, quantity: 1 })
        return
      }

      itemInCart.quantity++
    },
    incrementQuantity: (state, action) => {
      const itemInCart = state.items.find(({ id }) => id === action.payload)

      if (!itemInCart) {
        return
      }

      itemInCart.quantity++
    },
    decrementQuantity: (state, action) => {
      const itemInCart = state.items.find(({ id }) => id === action.payload)

      if (!itemInCart) {
        return
      }

      if (itemInCart.quantity === 1) {
        const index = state.items.indexOf(itemInCart)

        state.items.splice(index, 1)
      } else {
        itemInCart.quantity--
      }
    },
    removeFromCart: (state, action) => {
      const itemInCart = state.items.find(({ id }) => id === action.payload)

      if (!itemInCart) {
        return
      }

      const index = state.items.indexOf(itemInCart)

      state.items.splice(index, 1)
    },
    updateApproveMessage: (state, action) => {
      state.approveMessage = action.payload
    },
    updateErrorMessage: (state, action) => {
      state.errorMessage = action.payload
    },
    updateOrderID: (state, action) => {
      state.orderID = action.payload
    },
  },
})

const { actions, reducer } = cartSlice

export const cartReducer = reducer

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  updateApproveMessage,
  updateErrorMessage,
  updateOrderID,
} = actions