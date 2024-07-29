// src/components/Card.tsx
import { useKindeAuth } from '@kinde-oss/kinde-auth-react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCart } from '../app/feature/own-cart/ownCartSlice'
import { RootState } from '../app/store'
import { useDeleteData } from '../hooks/useDeleteData'
import { useFetchData } from '../hooks/useFetchData'
import Layout from '../layout/Layout'
import { TypeProducts } from '../types'

interface Quantities {
  [key: number]: number
}

const Card = () => {
  const dispatch = useDispatch()
  const { user } = useKindeAuth()
  const userCart = useSelector((state: RootState) => state.ownCart.userCart)

  console.log(userCart)
  const userCartItems = userCart?.data.filter(
    (item) => item.attributes.userId === user?.id
  )
  console.log(userCartItems)

  const productIds = userCartItems?.map((item) => item.attributes.productId)

  const { data: productData } = useFetchData<TypeProducts>(
    `products-admins/?id=${productIds}&`
  )

  const productsArray = Array.isArray(productData?.data)
    ? productData.data
    : [productData?.data]

  const userCartProducts = productsArray?.filter((product) =>
    userCartItems?.some(
      (item) => Number(item.attributes.productId) === product?.id
    )
  )

 

  // delete item from cart
  const { deleteData } = useDeleteData('cart-items', 'Cart item')

  const handleDelete = (cartId: number) => {
    deleteData(cartId)
      .then(() => {
        dispatch(deleteCart(cartId))
      })
      .catch((error) => {
        console.error('Failed to delete cart item:', error)
      })
  }
  // quantity of item
  const [quantities, setQuantities] = useState<Quantities>(
    userCartProducts.reduce((acc, product) => {
      acc[product!.id] = 1
      return acc
    }, {} as Quantities)
  )

  const decreaseQuantity = (productId: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]:
        prevQuantities[productId] > 1 ? prevQuantities[productId] - 1 : 1,
    }))
  }

  const increaseQuantity = (productId: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: prevQuantities[productId] + 1,
    }))
  }

  const totalPrice = userCartProducts.reduce((acc, curr) => {
    return acc + curr!.attributes.price * (quantities[curr!.id] || 1)
  }, 0)

  return (
    <Layout>
      {userCartProducts.length > 0 ? (
        <div className='mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 flex justify-between mt-20 gap-y-6 lg:flex-row flex-col'>
          <div className='left text-right lg:w-[50%] w-full'>
            <div>
              {userCartProducts.length > 0 &&
                userCartProducts.map((product) => {
                  const cartItem = userCartItems?.find(
                    (item) => Number(item.attributes.productId) === product?.id
                  )
                  return (
                    <div
                      key={product?.id}
                      className='p-4 border-b border-gray-500 flex gap-4 mb-2'
                    >
                      <img
                        src={`http://localhost:1337${product?.attributes.image.data.attributes.formats.thumbnail.url}`}
                        alt='img product'
                        width={'30%'}
                      />
                      <div className='titles text-left w-full'>
                        <div className='flex justify-between items-center'>
                          <h1 className='text-xl font-bold '>
                            {product?.attributes.title}
                          </h1>
                          <h1
                            className='text-2xl text-gray-500 cursor-pointer text-center w-16 h-10'
                            onClick={() =>
                              cartItem && handleDelete(cartItem.id)
                            }
                          >
                            x
                          </h1>
                        </div>
                        <p className='text-xl text-gray-500 my-2'>
                          {product?.attributes.price} EG
                        </p>
                        <div className='flex gap-2'>
                          {Array.isArray(product?.attributes.size) ? (
                            product.attributes.size.map((size, i) => (
                              <span
                                key={i}
                                className='mr-2 btn btn-sm'
                              >
                                {size}
                              </span>
                            ))
                          ) : (
                            <span>{product?.attributes.size}</span>
                          )}
                        </div>
                        <div className='mt-6 btn btn-circle w-32'>
                          <div className='text-center flex gap-4'>
                            <h1
                              className='text-2xl cursor-pointer'
                              onClick={() => decreaseQuantity(product!.id)}
                            >
                              -
                            </h1>
                            <span className='text-2xl'>
                              {quantities[product!.id]}
                            </span>
                            <h1
                              className='text-2xl cursor-pointer'
                              onClick={() => increaseQuantity(product!.id)}
                            >
                              +
                            </h1>
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
            <button className='w-full text-white btn btn-outline bg-black'>
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      ) : (
        <div className='flex justify-center items-center h-[70vh] text-5xl'>You didn't add product to cart</div>
      )}
    </Layout>
  )
}

export default Card
