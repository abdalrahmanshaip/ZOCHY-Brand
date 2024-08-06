import { useKindeAuth } from '@kinde-oss/kinde-auth-react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCart } from '../app/feature/own-cart/ownCartSlice'
import { RootState } from '../app/store'
import { useDeleteData } from '../hooks/useDeleteData'
import { useEditData } from '../hooks/useEditData'
import { useFetchData } from '../hooks/useFetchData'
import Layout from '../layout/Layout'
import { ProductsDatum, TypeProducts } from '../types'
import { useNavigate } from 'react-router'
import { useEffect, useState } from 'react'

interface Quantities {
  [key: number]: number
}

const Card = () => {
  const dispatch = useDispatch()
  const { user } = useKindeAuth()
  const navigate = useNavigate()
  const userCart = useSelector((state: RootState) => state.ownCart.userCart)

  const userCartItems =
    userCart?.data?.filter((item) => item.attributes.userId === user?.id) || [] // Fallback to an empty array if userCartItems is undefined

  const productIds = userCartItems.map((item) => item.attributes.productId)

  const { data: productData } = useFetchData<TypeProducts>(
    `products-admins/?id=${productIds}&`
  )

  const productsArray = Array.isArray(productData?.data)
    ? productData.data
    : [productData?.data]

  const userCartProducts = productsArray?.filter((product) =>
    userCartItems.some(
      (item) =>
        Number(item.attributes.productId) === product?.id &&
        product.attributes.maximumQuantity >= 1
    )
  )

  const { deleteData } = useDeleteData('cart-items', 'Cart item')

  const handleDelete = (cartId: number) => {
    deleteData(cartId)
    dispatch(deleteCart(cartId))
  }

  const { editData } = useEditData('cart-items', 'quantity')
  const [quantities, setQuantities] = useState<Quantities>(() => {
    // Load quantities from localStorage
    const savedQuantities = localStorage.getItem('cartQuantities')
    return savedQuantities ? JSON.parse(savedQuantities) : userCartItems.reduce((acc, item) => {
      acc[item.attributes.productId] = item.attributes.quantity
      return acc
    }, {} as Quantities)
  })

  useEffect(() => {
    // Save quantities to localStorage whenever they change
    localStorage.setItem('cartQuantities', JSON.stringify(quantities))
  }, [quantities])

  const updateQuantityInApi = async (
    productId: number,
    newQuantity: number
  ) => {
    const cartItem = userCartItems.find(
      (item) => Number(item.attributes.productId) === productId
    )

    if (cartItem) {
      await editData({ quantity: newQuantity }, cartItem.id)
    }
  }

  const decreaseQuantity = (productId: number) => {
    setQuantities((prevQuantities) => {
      const currentQuantity = prevQuantities[productId] || 1
      const newQuantity = Math.max(currentQuantity - 1, 1)
      updateQuantityInApi(productId, newQuantity) // Update API
      return {
        ...prevQuantities,
        [productId]: newQuantity,
      }
    })
  }

  const increaseQuantity = (productId: number) => {
    setQuantities((prevQuantities) => {
      const newQuantity = (prevQuantities[productId] || 1) + 1
      updateQuantityInApi(productId, newQuantity) // Update API
      return {
        ...prevQuantities,
        [productId]: newQuantity,
      }
    })
  }

  const totalPrice = userCartProducts.reduce((acc, curr) => {
    return acc + curr!.attributes.price * (quantities[curr!.id] || 1)
  }, 0)
  const handleCheckout = () => {
    navigate('/checkout', {
      state: {
        products: userCartProducts,
        userCartItems,
        quantities,
        totalPrice,
      },
    })
  }

  const size = 'large' || 'medium' || 'small' || 'thumbnail'
  const url = 'https://zochy-back-end-production.up.railway.app'

  const getImageUrl = (product: ProductsDatum) => {
    const formats = product.attributes.image.data[0].attributes?.formats
    return (
      formats[size]?.url ||
      formats['large']?.url ||
      formats['medium']?.url ||
      formats['small']?.url ||
      formats['thumbnail']?.url
    )
  }

  return (
    <Layout>
      {userCartProducts.length > 0 ? (
        <div className='mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 flex justify-between mt-20 gap-y-6 lg:flex-row flex-col'>
          <div className='left text-right lg:w-[50%] w-full'>
            <div>
              {userCartProducts.map((product) => {
                const cartItem = userCartItems.find(
                  (item) => Number(item.attributes.productId) === product?.id
                )

                return (
                  <div
                    key={product?.id}
                    className='p-4 border-b border-gray-500 flex gap-4 mb-2'
                  >
                    <img
                      src={`${url}${getImageUrl(product!)}`}
                      alt='img product'
                      className='w-52 object-cover rounded-md' // Tailwind CSS classes for styling
                    />
                    <div className='titles text-left w-full'>
                      <div className='flex justify-between items-center'>
                        <h1 className='text-xl font-bold'>
                          {product?.attributes.title}
                        </h1>
                        <h1
                          className='text-2xl text-gray-500 cursor-pointer text-center w-16 h-10'
                          onClick={() => cartItem && handleDelete(cartItem?.id)}
                        >
                          x
                        </h1>
                      </div>
                      <p className='text-xl text-gray-500 my-2'>
                        {product?.attributes.oldPrice ? (
                          <span className='line-through mr-4'>
                            {product.attributes.oldPrice
                              ? product.attributes.oldPrice + 'EG'
                              : ''}
                          </span>
                        ) : (
                          ''
                        )}
                        {product?.attributes.price} EG
                      </p>
                      <div className='flex gap-2'>
                        <span className='mr-2 btn btn-sm'>
                          {cartItem?.attributes.size}{' '}
                          {/* Show only the selected size */}
                        </span>
                      </div>
                      <div className='flex items-center my-5'>
                        <div className='text-center flex gap-4'>
                          <button
                            className='btn bg-black btn-sm text-white'
                            onClick={() => decreaseQuantity(product!.id)}
                          >
                            -
                          </button>
                          <span className='mx-4 text-xl'>
                            {quantities[product!.id]} {/* Default to 1 */}
                          </span>
                          <button
                            className='btn bg-black btn-sm text-white'
                            onClick={() => increaseQuantity(product!.id)}
                            disabled={
                              quantities[product!.id] >=
                              product!.attributes.maximumQuantity
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className='right lg:w-1/3 w-full bg-gray-100 p-5 h-fit'>
            {userCartProducts.map((product) => (
              <div
                className='flex justify-between items-center mb-6'
                key={product!.id}
              >
                <span>{product!.attributes.title}</span>
                {Number(product!.attributes.price) *
                  (quantities[product!.id] || 1)}{' '}
                EG
              </div>
            ))}
            <div className='flex justify-between items-center py-8 border-t border-gray-400'>
              <span className='font-bold text-xl'>Total</span>
              <span className='font-bold text-xl'>{totalPrice} EG</span>
            </div>
            <button
              onClick={handleCheckout}
              className='btn bg-black text-white w-full'
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className='flex justify-center items-center h-[70vh] text-5xl text-center'>
          You didn't add product to cart
        </div>
      )}
    </Layout>
  )
}

export default Card
