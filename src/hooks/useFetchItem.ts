import axios from 'axios'
import { useEffect, useState } from 'react'

export const useFetchItem = <T>(endPoint: string, id: number) => {
  const [data, setData] = useState<T | object>({})
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true)
        const response = await axios.get(
          `https://zochy-back-end-production.up.railway.app/api/${endPoint}/${id}?populate=*`
        )
        setData(response.data)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchItem()
  }, [endPoint, id])

  return { data, loading }
}
