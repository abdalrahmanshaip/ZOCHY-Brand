import { useSelector } from 'react-redux'
import Layout from '../layout/Layout'
import { AddProduct, DeleteProduct, EditProduct } from '../shared'
import { RootState } from '../app/store'
import LoadingPage from '../loading/LoadingPage'

const AdminDashboard = () => {
  const products = useSelector((state: RootState) => state.products.products)
  const loading = useSelector(
    (state: RootState) => state.products.loadingProducts
  )
  const skeletons: JSX.Element[] = []
  for (let i = 1; i <= (products?.data?.length as number); i++) {
    skeletons.push(
      <div
        key={i}
        className='skeleton h-12 w-full rounded-none'
      ></div>
    )
  }
  if (loading)
    return (
      <div>
        <LoadingPage />
      </div>
    )
  return (
    <Layout>
      <div className='max-w-screen-2xl m-auto text-right mt-20'>
        <AddProduct />
        <div className='table mt-10 border shadow-sm p-4'>
          <div className='overflow-x-auto'>
            {!loading ? (
              <table className='table text-center'>
                {/* head */}
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Sold Out</th>
                    <th>price</th>
                    <th>Image</th>
                    <th>Size</th>
                    <th>Category</th>
                    <th>maximum quantity</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {(products?.data.length as number) > 0 ? (
                    products?.data.map((product) => {
                      if (!product || !product.attributes) {
                        return null
                      }
                      return (
                        <tr
                          key={product.id}
                          className=''
                        >
                          <td>{product.attributes.title}</td>
                          <td>
                            {product.attributes.soldOut
                              ? 'Not sold out'
                              : 'Sold out'}
                          </td>
                          <td>
                            <span className='line-through'>
                              {product.attributes.oldPrice
                                ? product.attributes.oldPrice
                                : ''}
                            </span>{' '}
                            {product.attributes.price}
                          </td>
                          <td className='flex justify-center'>
                            <img
                              className=''
                              src={`https://zochy-back-end-production.up.railway.app${product.attributes.image.data[0].attributes?.formats.thumbnail.url}`}
                              alt={product.attributes.title}
                              width='100'
                            />
                            <img
                              className=''
                              src={`https://zochy-back-end-production.up.railway.app${product.attributes.image.data[1].attributes?.formats.thumbnail.url}`}
                              alt={product.attributes.title}
                              width='100'
                            />
                          </td>
                          <td>
                            {' '}
                            {Array.isArray(product.attributes.size) ? (
                              product.attributes.size.map((size, i) => {
                                return (
                                  <span
                                    key={i}
                                    className='mr-2'
                                  >
                                    {size}
                                  </span>
                                )
                              })
                            ) : (
                              <span>{product.attributes.size}</span>
                            )}
                          </td>
                          <td>{product.attributes.category}</td>
                          <td>{product.attributes.maximumQuantity}</td>
                          <td className='space-y-5'>
                            <EditProduct id={product.id} />
                            <DeleteProduct
                              id={product.id}
                              title={product.attributes.title}
                            />
                          </td>
                        </tr>
                      )
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className='text-center text-2xl'
                      >
                        No data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            ) : (
              <div className=''>{skeletons}</div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AdminDashboard
