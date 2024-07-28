import { useDispatch } from 'react-redux'
import { setCategory } from '../app/feature/admin/productSlice'
import { SyntheticEvent } from 'react'
const CategoryButton = () => {
  const dispatch = useDispatch()
  const handleCategory = (e: SyntheticEvent<HTMLSelectElement>) => {
    const category = (e.target as HTMLSelectElement).value
    if (category) {
      dispatch(setCategory(`filters[category][$eq]=${category}`))
    } else {
      dispatch(setCategory(null))
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
          Category
        </option>
        <option value={''}>All category</option>
        <option value={'T-shirt over size basic'}>
          T-shirt over size basic
        </option>
        <option value={'T-shirt over size print'}>
          T-shirt over size print
        </option>
        <option value={'baggy Sweatpants'}>baggy Sweatpants</option>
        <option value={'baggy Shorts'}>baggy Shorts</option>
      </select>
    </div>
  )
}

export default CategoryButton
