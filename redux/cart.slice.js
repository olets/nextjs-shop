import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const itemExists = state.find((item) => item.upc === action.payload.upc)
      if (itemExists) {
        itemExists.quantity++
      } else {
        state.push({ ...action.payload, quantity: 1 })
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.find((item) => item.upc === action.payload)
      item.quantity++
    },
    decrementQuantity: (state, action) => {
      const item = state.find((item) => item.upc === action.payload)
      if (item.quantity === 1) {
        const index = state.findIndex((item) => item.upc === action.payload)
        state.splice(index, 1)
      } else {
        item.quantity--
      }
    },
    removeFromCart: (state, action) => {
      const index = state.findIndex((item) => item.upc === action.payload)
      state.splice(index, 1)
    },
  },
})

export const cartReducer = cartSlice.reducer

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} = cartSlice.actions