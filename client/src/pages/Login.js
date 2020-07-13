import React, { useState, useContext, useEffect } from 'react'
import { Typography } from '@material-ui/core'
import { Link, useHistory } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { loginUser, resendLinkAPI, userAvatar } from '../api/api_user'
import { GlobalContext } from '../context/Context'
import ConfirmDialog from '../components/ConfirmDialog'
import {
  FormContainer,
  FormEmail,
  FormPassword,
  FormContent
} from '../components/Form'
import { MainTitle } from '../components/Title'
import { PrimaryButton } from '../components/Button'

const Login = () => {
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [disabled, setDisabled] = useState(false)
  const [, setCookie] = useCookies(['token'])
  const {
    dispatchUserData,
    dispatchChangeAvatar,
    dispatchConfirmDialog,
    dispatchSuccessDialog,
    dispatchError
  } = useContext(GlobalContext)

  useEffect(() => {
    document.title = 'Login'
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      setDisabled(true)
      const data = await loginUser({ email, password })

      if (data.success) {
        // create two cookies, token and user object data
        const expires = new Date(Date.now() + 6 * 3600000)
        setCookie('token', data.token, { expires, path: '/' }) // expires 6h
        setCookie('user', data.user, { expires, path: '/' }) // expires 6h

        dispatchUserData(data.user)

        if (data.hasAvatar) {
          const avatar = await userAvatar(data.user._id)

          if (avatar.status === 200) {
            dispatchChangeAvatar(avatar.url)
          }
        }

        // redirect to /my-goals
        history.push('/my-goals')
      }

      if (data.isNotVerified) {
        dispatchConfirmDialog(data.message)
        setDisabled(false)
        return
      }

      if (data.error) {
        dispatchError(data.message)
        setDisabled(false)
      }
    } catch (error) {
      dispatchError(error.message)
      setDisabled(false)
    }
  }

  const resendLink = async () => {
    try {
      const data = await resendLinkAPI({ email })

      console.log(data)

      if (data.success) {
        dispatchSuccessDialog(data.message)
      } else if (data.error) {
        dispatchError(data.message)
      }
    } catch (error) {
      dispatchError(error.message)
    }
  }

  return (
    <>
      {/* Display confirm dialog */}
      <ConfirmDialog confirmAction={resendLink} />

      <FormContainer>
        <MainTitle>Login</MainTitle>
        <FormContent handleSubmit={handleSubmit}>
          <FormEmail onChange={e => setEmail(e.target.value)} value={email} />
          <FormPassword
            label="Password"
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
          <PrimaryButton fullWidth disabled={disabled} type="submit">
            {!disabled ? 'Login' : 'Loading...'}
          </PrimaryButton>
        </FormContent>
        <Typography align="center">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </Typography>
      </FormContainer>
    </>
  )
}

export default Login
