import axios from 'axios'
import { useEffect, useState } from 'react'

export const useFetchData = <T>(endPoint: string) => {
  const [data, setData] = useState<T | null>(null)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://zochy-back-end-production.up.railway.app/api/${endPoint}populate=*`
        )
        setData(response.data)
      } catch (error) {
        console.error('Error:', error)
      }
    }
    fetchData()
  }, [endPoint])

  return { data }
}
