import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useFetchItem } from '../hooks/useFetchItem'
import Layout from '../layout/Layout'
import { ItemProduct, TypeProducts } from '../types'
import LoadingPage from '../loading/LoadingPage'
import { useKindeAuth } from '@kinde-oss/kinde-auth-react'
import { usePostData } from '../hooks/usePostData'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { useFetchData } from '../hooks/useFetchData'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { addCart } from '../app/feature/own-cart/ownCartSlice'

const ProductDetails = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const { user } = useKindeAuth()
  const navigate = useNavigate()
  const { data, loading } = useFetchItem<ItemProduct>(
    'products-admins',
    Number(id)
  ) as {
    data: ItemProduct
    loading: boolean
  }
  const { data: productAlsoLike } = useFetchData<TypeProducts>('products-admins?')
  const productWithTheSameCategory = productAlsoLike?.data
    .filter(product =>
      product?.id !== data.data?.id &&
      product.attributes.soldOut === false &&
      product.attributes.category === data.data.attributes.category
    )
  const { addData: addDataToUser } = usePostData('cart-items', 'Product cart')

  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [quantity, setQuantity] = useState<number>(1)

  const handleAddToCart = async (id: number) => {
    if (!selectedSize) {
      toast.error('No size selected')
      return
    }
    try {
      const data = await addDataToUser({
        productId: id,
        userId: user?.id,
        size: selectedSize,
        quantity,
      })
      dispatch(addCart(data))
      return data
      toast.success('Added to cart')
    } catch (error) {
      console.error(error)
      toast.error('Failed to add to cart')
    }
  }

  const skeleton: JSX.Element[] = []
  for (let i = 1; i <= (productWithTheSameCategory?.length || 0); i++) {
    skeleton.push(
      <div className='gap-4 grid' key={i}>
        <div className='skeleton h-32 w-full'></div>
        <div className='skeleton h-4 w-28'></div>
        <div className='skeleton h-4 w-full'></div>
        <div className='skeleton h-4 w-full'></div>
      </div>
    )
  }

  if (loading || !data?.data?.attributes) {
    return <LoadingPage />
  }

  return (
    <Layout>
      <div className='mx-auto max-w-screen-xl flex justify-center mt-5 flex-wrap gap-5'>
        <div className='md:w-1/3 w-full'>
          <div className='carousel'>
            {data.data.attributes.image.data.map((image, index) => (
              <div
                id={`item${index + 1}`}
                className='carousel-item w-full'
                key={index}
              >
                <img
                  src={`http://localhost:1337${image.attributes?.formats?.large?.url}`}
                  className='w-[100%]'
                  alt={`Product image ${index + 1}`}
                />
              </div>
            ))}
          </div>
          <div className='flex space-x-4 justify-center w-full'>
            {data.data.attributes.image.data.map((_, index) => (
              <a
                href={`#item${index + 1}`}
                className='cursor-pointer'
                key={index}
              >
                {index === 0 ? <IoIosArrowBack size={20} /> : <IoIosArrowForward size={20} />}
              </a>
            ))}
          </div>
        </div>
        <div className='md:w-1/2 w-full space-y-2'>
          <span className='text-gray-400'>ZOCHY</span>
          <p className='title text-4xl'>{data.data.attributes.title}</p>
          <p className='title text-4xl'>{data.data.attributes.category}</p>
          <p className='title text-xl'>LE {data.data.attributes.price} EG</p>
          <div className=''>
            <p className='text-2xl mb-2'>Size:</p>
            {Array.isArray(data.data.attributes.size) ? (
              data.data.attributes.size.map((size, i) => (
                <span
                  key={i}
                  className={`mr-2 btn btn-sm ${
                    selectedSize === size ? 'bg-blue-500 text-white' : ''
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </span>
              ))
            ) : (
              <span>{data.data.attributes.size}</span>
            )}
          </div>
          <div className='flex items-center'>
            <button
              className='btn bg-black btn-sm text-white'
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
            >
              -
            </button>
            <span className='mx-4 text-xl'>{quantity}</span>
            <button
              className='btn bg-black  btn-sm text-white'
              onClick={() => setQuantity(q => q + 1)}
            >
              +
            </button>
          </div>
          <button
            className='btn bg-black text-white w-full'
            onClick={() => handleAddToCart(data.data.id)}
          >
            Add to cart
          </button>
        </div>
      </div>
      <p className='text-center text-4xl my-10'>You may also like</p>
      <div className='mx-auto max-w-screen-2xl grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-12 mb-4'>
        {Number(productWithTheSameCategory?.length) > 0 ? (
          productWithTheSameCategory?.map((product) => (
            <div
              className='p-3 bg-white rounded-md shadow-lg flex flex-col'
              key={product.id}
            >
              {!loading ? (
                <>
                  <figure className='relative flex-shrink-0 h-96'>
                    <img
                      src={`http://localhost:1337${product.attributes.image.data[0].attributes?.formats?.large?.url}`}
                      alt='Product Image'
                      className='w-full h-full object-cover rounded-md'
                    />
                    {product.attributes.soldOut && (
                      <div className='absolute inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50'>
                        <span className='text-white text-2xl font-bold'>
                          Sold Out
                        </span>
                      </div>
                    )}
                  </figure>
                  <div className='mt-4 flex-grow'>
                    <div className='flex justify-between items-center mb-2'>
                      <h2 className='text-xl font-bold'>
                        {product.attributes.title}
                      </h2>
                      <p className='text-lg text-right'>
                        {product.attributes.price} EG
                      </p>
                    </div>
                    <p className='text-sm text-gray-600'>
                      Category: {product.attributes.category}
                    </p>
                    <div className='flex gap-2 mt-2'>
                      {Array.isArray(product.attributes.size) ? (
                        product.attributes.size.map((size, i) => (
                          <span
                            key={i}
                            className='mr-2 btn btn-sm'
                          >
                            {size}
                          </span>
                        ))
                      ) : (
                        <span>{product.attributes.size}</span>
                      )}
                    </div>
                  </div>
                  <div className='mt-4'>
                    <button
                      className='btn bg-black text-white w-full hover:bg-gray-800'
                      disabled={product.attributes.soldOut}
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      More Details
                    </button>
                  </div>
                </>
              ) : (
                <div className='flex flex-col h-full'>{skeleton}</div>
              )}
            </div>
          ))
        ) : (
          <div className='text-5xl text-center col-span-4 pt-10 text-red-700'>
            Sold Out
          </div>
        )}
      </div>
    </Layout>
  )
}

export default ProductDetails
