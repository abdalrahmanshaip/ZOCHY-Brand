import { useKindeAuth } from '@kinde-oss/kinde-auth-react'
import { useSelector } from 'react-redux'
import { CategoryFilter, SizeFilter } from '.'
import { RootState } from '../app/store'
import { usePostData } from '../hooks/usePostData'
import { useNavigate } from 'react-router'

const Products = () => {
  const navigate = useNavigate()
  const products = useSelector(
    (state: RootState) => state.products.ProductsFilter
  )

  const loading = useSelector(
    (state: RootState) => state.products.loadingProducts
  )
  const skeleton: JSX.Element[] = []
  for (let i = 1; i <= 1; i++) {
    skeleton.push(
      <div className='gap-4 grid'>
        <div className='skeleton h-32 w-full'></div>
        <div className='skeleton h-4 w-28'></div>
        <div className='skeleton h-4 w-full'></div>
        <div className='skeleton h-4 w-full'></div>
      </div>
    )
  }

 

  return (
    <div className=''>
      <div className=' max-w-screen-2xl m-auto flex items-center my-4  gap-8  md:flex-nowrap flex-wrap '>
        <span className='text-4xl h-4 text-start w-full'>Products</span>
        <div className=' flex gap-4 items-center justify-center m-auto'>
          <p className='text-2xl md:block hidden'>Filter:</p>
          <SizeFilter />
          <CategoryFilter />
        </div>
      </div>
      <div className='mx-auto  max-w-screen-2xl grid gap-4 grid-cols-4 gap-y-12 mb-28 '>
        {Number(products?.data.length) > 0 ? (
          products?.data.map((product) => {
            return (
              <div
                className=' p-3  col-span-4 md:col-span-2 lg:col-span-1  card shadow-xl'
                key={product.id}
              >
                {!loading ? (
                  <>
                    <figure
                      className='h-[60%]  flex justify-center items-center rounded-md '
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      <div className='relative'>
                        <img
                          src={`http://localhost:1337${product.attributes.image.data[0].attributes?.formats?.large?.url}`}
                          alt='img product'
                          width='100%'
                          className='flex justify-center items-center hover:translate'
                        />
                        {product.attributes.soldOut && (
                          <div className='absolute inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50'>
                            <span className='text-white text-2xl font-bold'>
                              Sold Out
                            </span>
                          </div>
                        )}
                      </div>
                    </figure>
                    <div className='mt-5 font-bold space-y-4'>
                      <div className='flex justify-between items-center card-title'>
                        <h2 className='text-xl'>{product.attributes.title}</h2>
                        <p className='text-lg text-right'>
                          {product.attributes.price} EG
                        </p>
                      </div>
                      <p>Category: {product.attributes.category}</p>

                      <div className='flex gap-2'>
                        <p>
                          {Array.isArray(product.attributes.size) ? (
                            product.attributes.size.map((size, i) => {
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
                            <span>{product.attributes.size}</span>
                          )}
                        </p>
                      </div>
                    </div>
                    <div className='card-actions justify-start mt-auto'>
                      <button
                        className='btn hover:bg-gray-800 bg-black text-white '
                        disabled={product.attributes.soldOut}
                        onClick={() => navigate(`/product/${product.id}`)}
                      >
                       more details
                      </button>
                    </div>
                  </>
                ) : (
                  <div>{skeleton}</div>
                )}
              </div>
            )
          })
        ) : (
          <div className='text-5xl text-center col-span-4 pt-10 text-red-700 '>
            Sold Out
          </div>
        )}
      </div>
    </div>
  )
}

export default Products
