import { useKindeAuth } from '@kinde-oss/kinde-auth-react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { addCart } from '../app/feature/own-cart/ownCartSlice'
import { RootState } from '../app/store'
import { usePostData } from '../hooks/usePostData'
import { useState } from 'react'

const AddToCart = ({
  id,
  size,
  quantity,
}: {
  id: number
  size: string | null
  quantity: number
}) => {
  const dispatch = useDispatch()
  const cartItem = useSelector((state: RootState) => state.ownCart.userCart)
  const { addData: addDataToUser } = usePostData('cart-items', 'Product cart')
  const { user, login } = useKindeAuth()
  const [showModal, setShowModal] = useState(false)

  const handleAddToCart = async (idProduct: number) => {
    const isProductInCart = cartItem?.data.some(
      (cart) => cart.attributes.productId == idProduct
    )
    if (!user) {
      setShowModal(true) // Show the modal if the user is not logged in
      return
    } else if (!size) {
      toast.error('No size selected')
      return
    } else if (isProductInCart) {
      toast.error('Product already in cart check it please')
      return
    }
    try {
      const data = await addDataToUser({
        productId: idProduct,
        userId: user?.id,
        size: size,
        quantity,
      })
      dispatch(addCart(data))
      return data
    } catch (error) {
      console.error(error)
      toast.error('Failed to add to cart')
    }
  }

  return (
    <>
      <div>
        <button
          className='btn bg-black text-white w-full'
          onClick={() => handleAddToCart(id)}
        >
          Add to cart
        </button>
      </div>

      {/* Modal */}
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
          <h3 className='text-lg font-bold'>You must log in</h3>
          <p className='py-4'>Please log in to add items to your cart.</p>
          <div className='modal-action'>
            <label
              htmlFor='my_modal_6'
              className='btn'
              onClick={() => setShowModal(false)}
            >
              Close
            </label>
            <button
              onClick={() => login()}
              type='button'
              className=' btn'
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddToCart
