import { useParams } from 'react-router'
import { useFetchItem } from '../hooks/useFetchItem'
import Layout from '../layout/Layout'
import { ItemProduct } from '../types'
import LoadingPage from '../loading/LoadingPage'
import { useKindeAuth } from '@kinde-oss/kinde-auth-react'
import { usePostData } from '../hooks/usePostData'

const ProductDetails = () => {
  const { user } = useKindeAuth()
  const { addData: addDataToUser } = usePostData('cart-items', 'Product cart')

  const handleAddToCart = async (id: number) => {
    try {
      const data = await addDataToUser({
        productId: id,
        userId: user?.id,
        quantity: 1,
      })

      return data
    } catch (error) {
      console.error('Error adding to cart:', error)
    }
  }
  const { id } = useParams()
  const { data, loading } = useFetchItem<ItemProduct>(
    'products-admins',
    Number(id)
  ) as {
    data: ItemProduct
    loading: boolean
  }
  if (loading)
    return (
      <div>
        <LoadingPage />
      </div>
    )
  if (!data || !data.data || !data.data.attributes) {
    return (
      <div>
        <LoadingPage />
      </div>
    )
  }
  return (
    <>
      <Layout>
        <div className='mx-auto  max-w-screen-xl flex justify-center mt-5 flex-wrap '>
          <div className='md:w-1/2 w-full '>
            <div className='carousel'>
              <div
                id='item1'
                className='carousel-item w-full'
              >
                <img
                  src={`http://localhost:1337${data.data.attributes.image.data[0].attributes?.formats?.large?.url}`}
                  className='w-[80%]'
                />
              </div>
              <div
                id='item2'
                className='carousel-item w-full'
              >
                <img
                  src={`http://localhost:1337${data.data.attributes.image.data[1].attributes?.formats?.large?.url}`}
                  className='w-[80%]'
                />
              </div>
            </div>
            <div className='flex justify-center gap-2 py-2'>
              <a
                href='#item1'
                className='btn btn-xs'
              >
                1
              </a>
              <a
                href='#item2'
                className='btn btn-xs'
              >
                2
              </a>
            </div>
          </div>
          <div className='md:w-1/2 w-full space-y-2'>
            <span className='text-gray-400'>ZOCHY</span>
            <p className='title text-4xl'>{data.data.attributes.title}</p>
            <p className='title text-xl'>LE {data.data.attributes.price} EG</p>
            <div className=''>
              <p className='text-2xl mb-2'>size:</p>
              {Array.isArray(data.data.attributes.size) ? (
                data.data.attributes.size.map((size, i) => {
                  return (
                    <span
                      key={i}
                      className='mr-2 btn btn-sm'
                    >
                      {size}
                    </span>
                  )
                })
              ) : (
                <span>{data.data.attributes.size}</span>
              )}
            </div>

            <button
              className='btn bg-black text-white  w-full'
              onClick={() => handleAddToCart(data.data.id)}
            >
              Add to cart
            </button>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default ProductDetails
