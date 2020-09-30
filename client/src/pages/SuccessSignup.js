import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Loading from '../components/Loading'

const SuccessSignup = ({ match }) => {
  const [confirmation, setConfirmation] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)
  const { idUser, idToken } = match.params

  useEffect(() => {
    let ignore = false

    const getData = async () => {
      try {
        if (!ignore) {
          const res = await fetch(`/api/user/confirmation/${idUser}/${idToken}`)
          const data = await res.json()

          // confirm link was successed or not
          if (data.success) setConfirmation(data.message)
          else setError(true)
        }
      } catch (error) {
        console.log(error.message)
        setError(true)
      }
      setIsLoading(false)
    }
    getData()

    return () => {
      ignore = true
    }
  }, [])

  if (isLoading) return <Loading />

  if (error) return <Redirect to="/404" />

  return (
    <p>
      {confirmation}. Login{' '}
      <Link to="/login" style={{ fontSize: 16 }}>
        Here
      </Link>
    </p>
  )
}

export default SuccessSignup
