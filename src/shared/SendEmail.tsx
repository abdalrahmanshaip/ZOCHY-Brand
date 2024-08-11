import { useKindeAuth } from '@kinde-oss/kinde-auth-react'
import emailjs from 'emailjs-com'
import { useState } from 'react'
import { MdDone } from 'react-icons/md'
import { useEditData } from '../hooks/useEditData'
import { ProductsDatum } from '../types'
import { useDispatch } from 'react-redux'
import { editProducts } from '../app/feature/admin/productSlice'

interface Quantities {
  [key: number]: number
}
interface UpdateProductRequest {
  maximumQuantity: number
}

const SendEmail = ({
  products,
  userCartItems,
  totalPrice,
  quantities,
  phoneNumber,
  address,
  apartment,
  city,
}: {
  products: ProductsDatum[]
  userCartItems: ProductsDatum[]
  totalPrice: number
  quantities: Quantities
  phoneNumber: number
  address: string
  apartment: string
  city: string
}) => {
  const dispatch = useDispatch()
  const { user } = useKindeAuth()
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const { editData } = useEditData<UpdateProductRequest>(
    'products-admins',
    'Product'
  )
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
  const sendEmail = async () => {
    if (
      !phoneNumber ||
      !apartment ||
      !city ||
      !address ||
      !products ||
      !totalPrice ||
      !quantities
    ) {
      return
    }

    // Prepare the email data
    const emailData = {
      to_name: 'Zochy',
      from_name: user?.given_name,
      message: `Order Summary:
        email: ${user?.email}
        phoneNumber: ${phoneNumber},
        address: ${address},
        apartment: ${apartment},
        city: ${city}
    
      \n\n${products
        .map(
          (product) =>
            `
        ${`${url}${getImageUrl(product)}`}
        ${userCartItems.map((product) => 'size: ' + product.attributes.size)}
        ${product?.attributes.title}: ${quantities[product.id]} x ${
              product?.attributes.price
            } EG\n`
        )
        .join('')}\nTotal Price: ${totalPrice} EG`,
    }

    setLoading(true)

    try {
      for (const product of products) {
        const productId = product.id
        const orderedQuantity = quantities[productId]
        const newQuantity = product.attributes.maximumQuantity - orderedQuantity
        const updataData = await editData(
          { maximumQuantity: newQuantity },
          productId
        )
        dispatch(editProducts(updataData))
      }

      // Send the email
      await emailjs.send(
        'service_g6y2y5f',
        'template_buobahu',
        emailData,
        '56SMsQMBO1xq8bL8V'
      )
      setShowModal(true)
    } catch (error) {
      console.error('Error sending email:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div>
        <button
          className='w-full text-white btn btn-outline bg-black'
          onClick={sendEmail}
        >
          Send Order
          {loading && (
            <span className='loading loading-spinner loading-xs'></span>
          )}
        </button>
      </div>
      {showModal && (
        <input
          type='checkbox'
          id='my_modal_6'
          className='modal-toggle'
          checked
          readOnly
        />
      )}
      <div
        className={`modal ${showModal ? 'modal-open' : ''}`}
        role='dialog'
      >
        <div className='modal-box text-center'>
          <h3 className='text-lg font-bold flex justify-center'>
            <MdDone
              className='h-40 text-green-500 border-green-500 border rounded-full w-fit'
              size={50}
            />
          </h3>
          <p className='py-4 text-4xl'>Success</p>
          <p className='text-xl text-gray-500'>We will connect with you soon</p>
          <div className='modal-action'>
            <label
              htmlFor='my_modal_6'
              className='btn'
              onClick={() => setShowModal(false)}
            >
              OK
            </label>
          </div>
        </div>
      </div>
    </>
  )
}

export default SendEmail
