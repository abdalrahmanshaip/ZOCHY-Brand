import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { FaRegEdit } from 'react-icons/fa'
import { useEditData } from '../hooks/useEditData'
import { useFetchItem } from '../hooks/useFetchItem'
import type { ItemProduct, PostProduct } from '../types'
import { useDispatch } from 'react-redux'
import { editProducts } from '../app/feature/admin/productSlice'

const EditProduct = ({ id }: { id: number }) => {
  const dispatch = useDispatch()
  const { data } = useFetchItem<ItemProduct>('products-admins', id) as {
    data: ItemProduct
    loading: boolean
  }
  const { editData } = useEditData<PostProduct>('products-admins', 'Product')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [open, setOpen] = useState(true)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostProduct>()

  useEffect(() => {
    if (data) {
      reset({
        title: data?.data?.attributes?.title,
        description: data?.data?.attributes?.description,
        price: data?.data?.attributes?.price,
        size: data?.data?.attributes?.size,
        category: data?.data?.attributes?.category,
      })
    }
  }, [data, reset])

  const onSubmit = async (formData: PostProduct) => {
    try {
      const returnData = await editData(formData, selectedFile, id)
      dispatch(editProducts(returnData))
      setOpen(false)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <>
      <label
        htmlFor={`my_modal_${id}`}
        className='btn'
      >
        <FaRegEdit size={20} />
      </label>

      <input
        type='checkbox'
        id={`my_modal_${id}`}
        onClick={() => setOpen(true)}
        className={`${open && 'modal-toggle'} bg-none`}
      />
      <div
        className='modal text-left'
        role='dialog'
      >
        <div className='modal-box max-w-4xl'>
          <h3 className='text-lg font-bold'>Edit item</h3>
          <p className='py-4'>
            Edit item including title, description, price, image and size
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='w-auto space-y-5'
          >
            <input
              className='input input-bordered w-full'
              type='text'
              placeholder='Add title to product'
              {...register('title', { required: true })}
            />
            {errors.title && (
              <p className='text-red-400 mt-4'>Title is required</p>
            )}
            <input
              className='input input-bordered w-full'
              type='text'
              placeholder='Add description'
              {...register('description', { required: true })}
            />
            {errors.description && (
              <p className='text-red-400 mt-4'>Description is required</p>
            )}
            <input
              className='input input-bordered w-full'
              type='number'
              placeholder='Add price of product'
              {...register('price', { required: true })}
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
            <div className='w-full h-[100px] border-gray-300 border border-dashed flex justify-center items-center'>
              <input
                className='file-input file-input-bordered'
                type='file'
                placeholder='Add image of product'
                required={true}
                onChange={(e) =>
                  setSelectedFile(e.target.files ? e.target.files[0] : null)
                }
              />
            </div>
            <div>{selectedFile?.name}</div>
            <div className='modal-action h-full flex justify-end items-end'>
              <label
                className='btn'
                htmlFor={`my_modal_${id}`}
              >
                Exit
              </label>
              <button
                className='btn'
                type='submit'
              >
                Edit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default EditProduct
