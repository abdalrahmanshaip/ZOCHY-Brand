import { createSlice } from '@reduxjs/toolkit'
import { TypeOwnCart } from '../../../types'

export interface OwnCartState {
  userCart: TypeOwnCart | null
}
const initialState: OwnCartState = {
  userCart: null,
}
export const OwnCartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setUserCart: (state, action) => {
      state.userCart = action.payload
    },
    deleteCart: (state, action) => {
      if (state.userCart) {
        state.userCart.data = state.userCart.data.filter(
          (cart) => cart.id !== action.payload
        )
      }
    },
  },
})

export const { setUserCart, deleteCart } = OwnCartSlice.actions

export default OwnCartSlice.reducer
