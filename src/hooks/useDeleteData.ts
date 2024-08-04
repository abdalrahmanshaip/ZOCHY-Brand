import axios from 'axios'
import { toast } from 'sonner'

export const useDeleteData = (endPoint: string, successMessage: string) => {
  const deleteData = async (id: number) => {
    try {
      await axios.delete(
        `https://zochy-back-end-production.up.railway.app/api/${endPoint}/${id}?populate=*`,
        {
          data: id,
        }
      )
      toast.success(`${successMessage} deleted successfully`)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }
  return {
    deleteData,
  }
}
