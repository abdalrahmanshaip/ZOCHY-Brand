import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './feature/admin/productSlice'
import ownCartReducer from './feature/own-cart/ownCartSlice'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    ownCart: ownCartReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
