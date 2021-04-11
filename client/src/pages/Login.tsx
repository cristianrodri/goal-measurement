import { useState, FormEvent, ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'
import { Typography } from '@material-ui/core'
import { Link, useHistory } from 'react-router-dom'
import { loginUser, resendLinkAPI } from '../api/api_user'
import ConfirmDialog from '../components/ConfirmDialog'
import {
  FormContainer,
  FormEmail,
  FormPassword,
  FormContent
} from '../components/Form'
import { MainTitle } from '../components/Title'
import { PrimaryButton } from '../components/Button'
import {
  confirmDialog,
  displayDialog,
  displayErrorSnackbar,
  userData,
  userAvatar,
  getGoals,
  isAuthenticated
} from '../redux'
import { URL } from './../api/url'
import { getGoalsByUser } from '../api/api_goals'
import moment from 'moment'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const Login = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [disabled, setDisabled] = useState(false)
  useDocumentTitle('login')

  const getGoalsAPI = async () => {
    const res = await getGoalsByUser(moment().utcOffset())

    if (res.success) dispatch(getGoals(res.data))
    else dispatch(displayErrorSnackbar(res.message))
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    try {
      setDisabled(true)
      const data = await loginUser({ email, password })

      if (data.success) {
        dispatch(userData(data.user))

        if (data.hasAvatar) {
          dispatch(userAvatar(`${URL}/api/user/${data.user._id}/avatar`))
        }

        // call user goals from API
        await getGoalsAPI()

        dispatch(isAuthenticated(data.hasToken))

        // redirect to /my-goals
        history.push('/my-goals')
      }

      if (data.isNotVerified) {
        dispatch(confirmDialog(data.message))
        setDisabled(false)
        return
      }

      if (data.error) {
        dispatch(displayErrorSnackbar(data.message))
        setDisabled(false)
      }
    } catch (error) {
      dispatch(displayErrorSnackbar(error.message))
      setDisabled(false)
    }
  }

  const resendLink = async () => {
    try {
      const data = await resendLinkAPI({ email })

      if (data.success) {
        dispatch(displayDialog(data.message))
      } else if (data.error) {
        dispatch(displayErrorSnackbar(data.message))
      }
    } catch (error) {
      dispatch(displayErrorSnackbar(error.message))
    }
  }

  return (
    <>
      {/* Display confirm dialog */}
      <ConfirmDialog confirmAction={resendLink} />

      <FormContainer>
        <MainTitle>Login</MainTitle>
        <FormContent handleSubmit={handleSubmit}>
          <FormEmail
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            value={email}
          />
          <FormPassword
            label="Password"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
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
