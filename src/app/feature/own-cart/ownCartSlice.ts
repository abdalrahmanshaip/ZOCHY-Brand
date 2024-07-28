import { createSlice } from '@reduxjs/toolkit'
import { TypeOwnCart } from '../../../types'

export interface OwnCartState {
  userCart: TypeOwnCart | null
  dataCart: TypeOwnCart | null
}
const initialState: OwnCartState = {
  userCart: null,
  dataCart: null,
}
export const OwnCartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setUserCart: (state, action) => {
      state.userCart = action.payload
    },
    setDataCart: (state, action) => {
      state.dataCart = action.payload
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

export const { setUserCart, setDataCart, deleteCart } = OwnCartSlice.actions

export default OwnCartSlice.reducer
