import { useState } from 'react'
import { MdDelete } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { deleteProducts } from '../app/feature/admin/productSlice'
import { useDeleteData } from '../hooks/useDeleteData'

const DeleteProduct = ({ id, title }: { id: number; title: string }) => {
  const dispatch = useDispatch()

  const { deleteData } = useDeleteData(`products-admins`, 'product')
  const [open, setOpen] = useState(true)

  const handleDeleteClick = async () => {
    try {
      await deleteData(id)
      dispatch(deleteProducts(id))
      setOpen(false)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <label
        htmlFor={`my_modal_${id - 100}`}
        className='btn'
      >
        <MdDelete size={20} />
      </label>
      <input
        type={`${open ? 'checkbox' : ''}`}
        id={`my_modal_${id - 100}`}
        onClick={() => setOpen(true)}
        className={`${open && 'modal-toggle'}`}
      />
      <div
        className='modal text-left'
        role='dialog'
      >
        <div className='modal-box'>
          <h3 className='text-lg font-bold'>Delete {title} product</h3>
          <p className='py-4'>Are you sure to delete this item</p>
          <div className='modal-action'>
            <label
              htmlFor={`my_modal_${id - 100}`}
              className='btn'
            >
              cancel
            </label>

            <button
              onClick={handleDeleteClick}
              className='btn'
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteProduct
