import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation } from 'react-router-dom'
import Layout from '../layout/Layout'
import { SendEmail } from '../shared'
import { Datum, ProductsDatum, TypeCheckout } from '../types'

const CheckoutPage = () => {
  const location = useLocation()
  const { products, userCartItems, quantities, totalPrice } =
    location.state || {
      products: [],
      quantities: {},
      totalPrice: 0,
    }

  const [phoneNumber, setPhoneNumber] = useState(0)
  const [address, setAddress] = useState('')
  const [apartment, setApartment] = useState('')
  const [city, setCity] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TypeCheckout>()
  const onSubmit = (data: TypeCheckout) => {
    setPhoneNumber(data.phoneNumber)
    setAddress(data.address)
    setApartment(data.apartment)
    setCity(data.city)
  }
  const size = 'large' || 'medium' || 'small' || 'thumbnail'
  const url = 'https://zochy-back-end-production.up.railway.app'

  const getImageUrl = (product: ProductsDatum) => {
    const formats = product.attributes.image.data[0].attributes?.formats
    return formats[size]?.url || formats['large']?.url || formats['medium']?.url || formats['small']?.url || formats['thumbnail']?.url
  }
  return (
    <Layout>
      <div className=''>
        <div className='grid grid-cols-4 text-black h-[100vh] '>
          <div className='lg:col-span-2 col-span-4 bg-white p-4 lg:ms-[30%]'>
            <h1 className='text-2xl my-5'>Contact</h1>
            <form
              action=''
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                type='number'
                placeholder='Mobile phone number'
                className='input input-bordered  w-full '
                {...register('phoneNumber', {
                  required: true,
                  pattern: {
                    value: /^01[0-2]\d{1,8}$/,
                    message: 'Invalid phone number',
                  },
                })}
              />
              {errors.phoneNumber && (
                <p className='text-red-400 mt-4'>Phone number is required</p>
              )}
              <h1 className='text-2xl my-5'>Delivery</h1>
              <div className='space-y-5'>
                <input
                  type='text'
                  placeholder='Address'
                  className='input input-bordered w-full'
                  {...register('address', {
                    required: true,
                  })}
                />
                {errors.address && (
                  <p className='text-red-400 my-4'>Address is required</p>
                )}
                <input
                  type='text'
                  placeholder='Apartment'
                  className='input input-bordered w-full'
                  {...register('apartment', {
                    required: true,
                  })}
                />
                {errors.apartment && (
                  <p className='text-red-400 my-4'>Apartment is required</p>
                )}
                <input
                  type='text'
                  placeholder='City'
                  className='input input-bordered w-full'
                  {...register('city', {
                    required: true,
                  })}
                />
                {errors.city && (
                  <p className='text-red-400 my-4'>City is required</p>
                )}
              </div>
              <div className='mt-5'>
                <SendEmail
                  userCartProducts={products}
                  totalPrice={totalPrice}
                  quantities={quantities}
                  phoneNumber={phoneNumber}
                  address={address}
                  apartment={apartment}
                  city={city}
                />
              </div>
            </form>
          </div>
          <div className='lg:col-span-2 col-span-4 bg-[#F5F5F5] p-4'>
            {products.map((product: ProductsDatum) => {
              const cartItem = userCartItems?.find(
                (item: Datum) =>
                  Number(item.attributes.productId) === product?.id
              )
              return (
                <div
                  className='mb-3'
                  key={product.id}
                >
                  <div className='top-item flex  items-center '>
                    <div>
                      <img
                        src={`${url}${getImageUrl(product)}`}
                        alt=''
                        className='w-20'
                      />
                    </div>
                    <div className='flex items-center ms-5 gap-20'>
                      <div className=''>
                        <p>{product.attributes.title}</p>
                        <p className='text-sm text-gray-500'>
                          {cartItem?.attributes.size}
                        </p>
                        <p>quantitie: {quantities[product.id]}</p>
                      </div>
                      <p>
                        {' '}
                        {Number(product!.attributes.price) *
                          (quantities[product!.id] || 1)}{' '}
                        EG
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
            <div className='lg:w-1/2'>
              <div className='slary-items mt-10 text-gray-600'>
                <div className='flex justify-between items-center'>
                  <p>Subtotal</p>
                  <p>LE {totalPrice} EG</p>
                </div>

                <div className='flex justify-between items-center text-2xl text-black'>
                  <p>Total</p>
                  <p>LE {totalPrice} EG</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CheckoutPage
