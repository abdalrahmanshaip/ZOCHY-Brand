import axios from 'axios'
import { toast } from 'sonner'

export const usePostData = <T>(endPoint: string, successMessage: string) => {
  const addData = async (item: T, imageFile?: File | null) => {
    try {
      const formData = new FormData()
      formData.append('data', JSON.stringify(item))
      if (imageFile) {
        formData.append('files.image', imageFile)
      }
      const response = await axios.post(
        `http://localhost:1337/api/${endPoint}?populate=*`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      toast.success(`${successMessage} added successfully`)
      return response.data.data 
    } catch (error) {
      toast.error('Failed to add item')
      console.error(error)
    }
  }
  return { addData }
}
