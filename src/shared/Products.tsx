import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { CategoryFilter, SizeFilter } from '.'
import { RootState } from '../app/store'

const Products = () => {
  const navigate = useNavigate()
  const products = useSelector(
    (state: RootState) => state.products.ProductsFilter
  )

  const loading = useSelector(
    (state: RootState) => state.products.loadingProducts
  )
  const skeleton: JSX.Element[] = []
  for (let i = 1; i <= Number(products?.data.length); i++) {
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
    <div>
      <div className='max-w-screen-2xl m-auto flex items-center my-4 gap-8 md:flex-nowrap flex-wrap'>
        <span className='text-4xl text-start w-full'>Products</span>
        <div className='flex gap-4 items-center justify-center m-auto'>
          <p className='text-2xl md:block hidden'>Filter:</p>
          <SizeFilter />
          <CategoryFilter />
        </div>
      </div>
      <div className='mx-auto max-w-screen-2xl grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-12 mb-5'>
        {Number(products?.data.length) > 0 ? (
          products?.data.map((product) => (
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
                    <div className=' mb-2'>
                      <h2 className='text-xl font-bold'>
                        {product.attributes.title}
                      </h2>
                      <p className='my-2   text-start '>
                        {product.attributes.oldPrice ? (
                          <span className='line-through mr-4'>
                            {product.attributes.oldPrice
                              ? product.attributes.oldPrice + 'EG'
                              : ''}
                          </span>
                        ) : (
                          ''
                        )}
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
    </div>
  )
}

export default Products
