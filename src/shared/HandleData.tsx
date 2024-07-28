import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  setLoadingProducts,
  setProducts,
  setProductsFilter,
} from '../app/feature/admin/productSlice'
import { setLoadingCart } from '../app/feature/user/cartSlice'
import { RootState } from '../app/store'
import { useFetchData } from '../hooks/useFetchData'
import { TypeProducts } from '../types'
import { OwnCartState, setUserCart } from '../app/feature/own-cart/ownCartSlice'

const HandleData = () => {
  const dispatch = useDispatch()

  const { data: cart } = useFetchData<OwnCartState>('cart-items?')

  // Handle category filter
  const filterByCategory = useSelector(
    (state: RootState) => state.products.category
  )
  const filterBySize = useSelector((state: RootState) => state.products.size)
  const { data: products } = useFetchData<TypeProducts>(`products-admins?`)
  const { data: productsFilter } = useFetchData<TypeProducts>(
    filterByCategory || filterBySize
      ? `products-admins?${filterByCategory}&${filterBySize}&`
      : 'products-admins?'
  )
  // ////////////////////////////////

  useEffect(() => {
    try {
      products &&
        dispatch(setLoadingProducts(true)) &&
        dispatch(setProducts(products), setProductsFilter(products)) &&
        productsFilter &&
        dispatch(setProductsFilter(productsFilter)) &&
        dispatch(setProductsFilter(productsFilter))
      cart && dispatch(setUserCart(cart))
    } catch (error) {
      console.error(error)
    } finally {
      dispatch(setLoadingProducts(false))
      dispatch(setLoadingCart(false))
    }
  }, [products, productsFilter, cart, dispatch])

  return null
}

export default HandleData
