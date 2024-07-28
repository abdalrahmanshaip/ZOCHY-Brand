import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TypeProducts } from '../../../types'

export interface ProductsState {
  products: TypeProducts | null
  ProductsFilter: TypeProducts | null
  loadingProducts: boolean
  category: string
  size: string[]
}

const initialState: ProductsState = {
  products: null,
  ProductsFilter: null,
  loadingProducts: false,
  category: '',
  size: ['S', 'M', 'L', 'XL'],
}

export const ProductsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload
    },
    setCategory: (state, action) => {
      state.category = action.payload
    },
    setSize: (state, action) => {
      state.size = action.payload
    },
    setProductsFilter: (state, action) => {
      state.ProductsFilter = action.payload
    },
    setLoadingProducts: (state, action: PayloadAction<boolean>) => {
      state.loadingProducts = action.payload
    },
    addProducts: (state, action) => {
      state?.products?.data.push(action.payload)
    },
    editProducts: (state, action) => {
      if (state.products?.data) {
        const index = state.products.data.findIndex(
          (product) => product.id === action.payload.id
        )
        if (index !== -1) {
          state.products.data[index] = action.payload
        }
      }
    },
    deleteProducts: (state, action: PayloadAction<number>) => {
      if (state.products?.data) {
        state.products.data = state.products?.data?.filter(
          (product) => product.id !== action.payload
        )
      }
    },
  },
})

export const {
  setProducts,
  setCategory,
  setSize,
  setProductsFilter,
  setLoadingProducts,
  addProducts,
  editProducts,
  deleteProducts,
} = ProductsSlice.actions

export default ProductsSlice.reducer

/*
 extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload
        state.loading = false
        state.error = null
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.error = 'Failed to fetch products'
        state.loading = false
      })
  },


  export const fetchProducts = createAsyncThunk<Products, void>(
  'products/fetchProducts',
  async () => {
    const response = await fetch(
      'http://localhost:1337/api/products?populate=*'
    )
    return await response.json()
  }
)
*/
