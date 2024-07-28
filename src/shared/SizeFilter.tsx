import { useDispatch } from 'react-redux'
import { setSize } from '../app/feature/admin/productSlice'
import { SyntheticEvent } from 'react'
const SizeFilter = () => {
  const dispatch = useDispatch()
  const handleCategory = (e: SyntheticEvent<HTMLSelectElement>) => {
    const size = (e.target as HTMLSelectElement).value
    if (size) {
      dispatch(setSize(`filters[size][$contains]=${size}`))
    } else {
      dispatch(setSize(null))
    }
  }
  return (
    <div className=''>
      <select
        className='select select-bordered  max-w-xs'
        defaultValue={''}
        onChange={handleCategory}
      >
        <option
          disabled
          value={''}
        >
          Size
        </option>
        <option value={''}>All Sizes</option>
        <option value={'S'}>
          S
        </option>
        <option value={'M'}>
          M
        </option>
        <option value={'L'}>
          L
        </option>
        <option value={'XL'}>XL</option>
        <option value={'2XL'}>2XL</option>
      </select>
    </div>
  )
}

export default SizeFilter
