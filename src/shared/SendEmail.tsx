import { useKindeAuth } from '@kinde-oss/kinde-auth-react'
import emailjs from 'emailjs-com'
import { useState } from 'react'
import { MdDone } from 'react-icons/md'
import { ProductsDatum } from '../types'

interface Quantities {
  [key: number]: number
}
const SendEmail = ({
  userCartProducts,
  totalPrice,
  quantities,
  phoneNumber,
  address,
  apartment,
  city,
}: {
  userCartProducts: ProductsDatum[]
  totalPrice: number
  quantities: Quantities
  phoneNumber: number
  address: string
  apartment: string
  city: string
}) => {
  const { user } = useKindeAuth()
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)

  const sendEmail = async () => {
    if (
      !phoneNumber ||
      !apartment ||
      !city ||
      !address ||
      !userCartProducts ||
      !totalPrice ||
      !quantities
    ) {
      return
    }
    const emailData = {
      to_name: 'Zochy', // Replace with the recipient's name if available
      from_name: user?.given_name,
      message: `Order Summary:
          email: ${user?.email}
          phoneNumber: ${phoneNumber},
          address: ${address},
          apartment: ${apartment},
          city: ${city}
      
      \n\n${userCartProducts
        .map(
          (product) =>
            `
          ${`http://localhost:1337${product?.attributes.image.data[0].attributes.formats.large.url}`}
          ${product?.attributes.title}: ${quantities[product.id]} x ${
              product?.attributes.price
            } EG\n`
        )
        .join('')}\nTotal Price: ${totalPrice} EG`,
    }

    setLoading(true)

    try {
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
          <p className='py-4 text-4xl'>Seccess</p>
          <p className='text-xl text-gray-500'>we will conect with you soon</p>
          <div className='modal-action'>
            <label
              htmlFor='my_modal_6'
              className='btn'
              onClick={() => setShowModal(false)}
            >
              ok
            </label>
          </div>
        </div>
      </div>
    </>
  )
}

export default SendEmail
