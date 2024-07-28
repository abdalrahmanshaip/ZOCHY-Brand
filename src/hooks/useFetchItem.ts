import axios from 'axios'
import { useEffect, useState } from 'react'

export const useFetchItem = <T>(endPoint: string, id: number) => {
  const [data, setData] = useState<T | object | null>({})
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true)
        const response = await axios.get(
          `http://localhost:1337/api/${endPoint}/${id}?populate=*`
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
