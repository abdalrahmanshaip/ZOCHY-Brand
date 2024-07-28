import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TypeProducts } from '../../../types'

export interface CartState {
  cart: TypeProducts | null
  loadingCart: boolean
  id: number | null
}

const initialState: CartState = {
  cart: null,
  loadingCart: false,
  id: null,
}

export const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<TypeProducts>) => {
      state.cart = action.payload
    },
    setCartId: (state, action: PayloadAction<number>) => {
      state.id = action.payload
    },
    addCarts: (state, action) => {
      state.cart?.data.push(action.payload)
    },
    setLoadingCart: (state, action: PayloadAction<boolean>) => {
      state.loadingCart = action.payload
    },
    deleteCart: (state, action: PayloadAction<number>) => {
      if (state.cart?.data) {
        state.cart.data = state.cart.data.filter(
          (cart) => cart.id !== action.payload
        )
      }
    },
    clearCart: (state, action) => {
      state.id = action.payload
    },
  },
})

export const {
  setCart,
  setCartId,
  clearCart,
  addCarts,
  
  setLoadingCart,
} = CartSlice.actions

export default CartSlice.reducer
