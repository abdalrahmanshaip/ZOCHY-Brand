import { useForm } from 'react-hook-form'
import { usePostData } from '../hooks/usePostData'
import type { PostProduct } from '../types'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addProducts } from '../app/feature/admin/productSlice'

const AddProduct = () => {
  const dispatch = useDispatch()
  const { addData } = usePostData<PostProduct>('products-admins', 'Product')
  const [selectedFile1, setSelectedFile1] = useState<File | null>(null)
  const [selectedFile2, setSelectedFile2] = useState<File | null>(null)
  const [open, setOpen] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PostProduct>()

  const onSubmit = async (data: PostProduct) => {
    try {
      const returnedData = await addData(data, selectedFile1, selectedFile2)
      dispatch(addProducts(returnedData))
      setOpen(false)
      reset()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <>
      {/* The button to open modal */}
      <label
        htmlFor='my_modal_6'
        className='btn btn-outline'
      >
        Add Product
      </label>

      {/* Put this part before </body> tag */}
      <input
        type={`checkbox`}
        id='my_modal_6'
        onClick={() => setOpen(true)}
        className={`${open && 'modal-toggle'}`}
      />
      <div
        className='modal text-left'
        role='dialog'
      >
        <div className='modal-box  max-w-4xl'>
          <h3 className='text-lg font-bold'>Add item</h3>
          <p className='py-4'>
            Add item iclude title, description, price, image and size
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='w-auto space-y-5'
          >
            <input
              className='input input-bordered w-full '
              type='text'
              placeholder='Add title to droduct'
              {...register('title', { required: true })}
            />
            {errors.title && (
              <p className='text-red-400 mt-4'>Title is required</p>
            )}
            <input
              className='input input-bordered w-full '
              type='number'
              placeholder='Add old price of product'
              {...register('oldPrice', {
                required: false,
              })}
            />
            <input
              className='input input-bordered w-full '
              type='number'
              placeholder='Add price of product'
              {...register('price', {
                required: true,
              })}
            />
            {errors.price && (
              <p className='text-red-400 mt-4'>Price is required</p>
            )}
            <select
              className='select select-bordered h-fit w-full '
              {...register('category', { required: true })}
            >
              <option value=''>Pick category of product</option>
              <option value='T-shirt over size basic'>
                T-shirt over size basic
              </option>
              <option value='T-shirt over size print'>
                T-shirt over size print
              </option>
              <option value='baggy Sweatpants'>baggy Sweatpants</option>
              <option value='baggy Shorts'>baggy Shorts</option>
            </select>
            {errors.category && (
              <p className='text-red-400 mt-4'>category is required</p>
            )}

            <select
              multiple
              className='select select-bordered h-fit w-full '
              {...register('size', { required: true })}
            >
              <option value=''>Pick size of product</option>
              <option value='S'>S</option>
              <option value='M'>M</option>
              <option value='L'>L</option>
              <option value='XL'>XL</option>
              <option value='2XL'>2XL</option>
            </select>
            {errors.size && (
              <p className='text-red-400 mt-4'>Size is required</p>
            )}
            <input
              className='input input-bordered w-full '
              type='number'
              placeholder='maximum quantity of product'
              {...register('maximumQuantity', {
                required: true,
              })}
            />
            {errors.maximumQuantity && (
              <p className='text-red-400 mt-4'>maximum quantity is required</p>
            )}
            <div className='w-full h-[150px] border-gray-300 border border-dashed flex justify-center items-center flex-wrap gap-x-5'>
              <input
                required={true}
                className='file-input file-input-bordered'
                type='file'
                onChange={(e) =>
                  setSelectedFile1(e.target.files ? e.target.files[0] : null)
                }
              />
              <input
                required={true}
                className='file-input file-input-bordered'
                type='file'
                onChange={(e) =>
                  setSelectedFile2(e.target.files ? e.target.files[0] : null)
                }
              />
            </div>

            <span className='text-xl'>
              sold Out? <p>the default is no</p>
            </span>
            <input
              type='checkbox'
              className='toggle toggle-success block'
              {...register('soldOut')}
            />
            <div className='modal-action h-full flex justify-end items-end'>
              <label
                className='btn'
                htmlFor='my_modal_6'
              >
                exit
              </label>
              <button
                className='btn'
                type='submit'
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default AddProduct
