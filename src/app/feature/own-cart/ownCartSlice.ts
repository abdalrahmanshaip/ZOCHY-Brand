import { createSlice } from '@reduxjs/toolkit'
import { TypeOwnCart } from '../../../types'

export interface OwnCartState {
  userCart: TypeOwnCart | null
  loadingCart: boolean
}
const initialState: OwnCartState = {
  userCart: null,
  loadingCart: false,
}
export const OwnCartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setUserCart: (state, action) => {
      state.userCart = action.payload
    },
    addCart: (state, action) => {
      state.userCart?.data.push(action.payload)
    },
    setLoadingCart: (state, action) => {
      state.loadingCart = action.payload
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

export const { setUserCart, addCart, setLoadingCart, deleteCart } = OwnCartSlice.actions

export default OwnCartSlice.reducer
