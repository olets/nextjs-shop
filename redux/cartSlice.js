import { createSelector, createSlice } from '@reduxjs/toolkit'

const INITIAL_STATE = {
  approveMessage: '',
  errorMessage: '',
  items: [],
  orderID: null,
  shippingValue: 10,
  taxTotalValue: 20,
}

export const selectItems = (state) => state.items
export const selectShippingValue = (state) => state.shippingValue
export const selectTaxTotalValue = (state) => state.taxTotalValue

export const selectTotalQuantity = createSelector(
  [selectItems],
  (items) => items.reduce((acc, cur) => {
    return acc + cur.quantity
  }, 0)
)

export const selectItemTotalValue = createSelector(
  [selectItems],
  (items) => items.reduce((acc, cur) => {
    return acc + cur.quantity * cur.price
  }, 0)
)

export const selectAmountValue = createSelector(
  [selectItemTotalValue, selectShippingValue, selectTaxTotalValue],
  (itemTotalValue, shippingValue, taxTotalValue) => {
    return itemTotalValue + shippingValue + taxTotalValue
  }
)

const cartSlice = createSlice({
  name: 'cart',
  initialState: INITIAL_STATE,
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