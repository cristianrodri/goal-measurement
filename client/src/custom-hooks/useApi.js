import React, { useEffect, useState } from 'react'

export const useApi = (callApiFunction, { token = '' } = {}) => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const dataDB = await callApiFunction(token)

        setData(dataDB)
      } catch (error) {
        setError(true)
      }

      setIsLoading(false)
    }

    fetchData()
  }, [])

  return { data, error, isLoading }
}