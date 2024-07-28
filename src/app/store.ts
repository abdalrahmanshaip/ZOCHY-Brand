import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './feature/admin/productSlice'
import cartReducer from './feature/user/cartSlice'
import ownCartReducer from './feature/own-cart/ownCartSlice'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    ownCart: ownCartReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
