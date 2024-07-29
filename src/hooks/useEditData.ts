import axios from 'axios'
import { toast } from 'sonner'

export const useEditData = <T>(endPoint: string, successMessage: string) => {
  const editData = async (item: T, id: number) => {
    try {
      
      const response = await axios.put(
        `http://localhost:1337/api/${endPoint}/${id}?populate=*`,
        {
          data: item
        }
      )
      toast.success(`${successMessage} edited successfully`)
      return response.data.data
    } catch (error) {
      toast.error('Failed to edit item')
      console.error('Error editing item:', error)
    }
  }

  return { editData }
}
