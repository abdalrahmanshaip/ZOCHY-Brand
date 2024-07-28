import axios from 'axios'
import { toast } from 'sonner'

export const useEditData = <T>(endPoint: string, successMessage: string) => {
  const editData = async (item: T, imageFile: File | null, id: number) => {
    try {
      const formData = new FormData()
      formData.append('data', JSON.stringify(item))
      if (imageFile) {
        formData.append('files.image', imageFile)
      }
      const response = await axios.put(
        `http://localhost:1337/api/${endPoint}/${id}?populate=*`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
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
