import { useKindeAuth } from '@kinde-oss/kinde-auth-react'
import emailjs from 'emailjs-com'
import { ProductsDatum } from '../types'
import { useState } from 'react'
import { MdDone } from 'react-icons/md'

interface Quantities {
  [key: number]: number
}
const SendEmail = ({
  userCartProducts,
  totalPrice,
  quantities,
}: {
  userCartProducts: ProductsDatum[]
  totalPrice: number
  quantities: Quantities
}) => {
  const { user } = useKindeAuth()
  const [showModal, setShowModal] = useState(false)
  const sendEmail = () => {
    const emailData = {
      to_name: 'Zochy', // Replace with the recipient's name if available
      from_name: user?.given_name,
      message: `Order Summary:\n\n${userCartProducts
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
    try {
      emailjs
        .send(
          'service_g6y2y5f',
          'template_buobahu',
          emailData,
          '56SMsQMBO1xq8bL8V'
        )
        .then(() => {
          setShowModal(true)
        })
    } catch (error) {
      console.error('Error sending email:', error)
    }
  }
  return (
    <>
      <div>
        <button
          className='w-full text-white btn btn-outline bg-black'
          onClick={sendEmail}
        >
          PROCEED TO CHECKOUT
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
