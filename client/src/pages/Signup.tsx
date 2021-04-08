import React, { useState, FormEvent, ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'
import { useTheme, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { createUser } from '../api/api_user'
import {
  FormContainer,
  FormUsername,
  FormEmail,
  FormPassword,
  FormAvatar,
  FormContent
} from '../components/Form'
import { MainTitle } from '../components/Title'
import { PrimaryButton } from '../components/Button'
import { displayDialog, displayErrorSnackbar } from '../redux'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const Signup = () => {
  const theme = useTheme()
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [image, setImage] = useState<File | undefined>(undefined)
  const [imageName, setImageName] = useState('')
  const [disabled, setDisabled] = useState(false)
  useDocumentTitle('Signup')

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    if (password !== confirmPassword) {
      dispatch(displayErrorSnackbar('Your passwords must be equals'))
      return
    }

    const formData = new FormData()
    formData.append('username', username)
    formData.append('email', email)
    formData.append('password', password)
    if (image) {
      formData.append('avatar', image)
    }

    setDisabled(true)

    try {
      const data = await createUser(formData)

      // signup is successed but need to verify the account in display dialog
      if (data.success) {
        dispatch(displayDialog(data.message))

        // Empty all input fields after success sign up
        const fields = [
          setUsername,
          setEmail,
          setPassword,
          setConfirmPassword,
          setImageName
        ]
        fields.map(field => field(''))

        setImage(undefined)
      } else if (data.error) {
        dispatch(displayErrorSnackbar(data.message))
      }
      setDisabled(false)
    } catch (error) {
      dispatch(displayErrorSnackbar(error.message))
    }
  }

  const uploadImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      setImage(event.target.files[0])
      setImageName(event.target.files[0].name)
    }
  }

  const deleteImage = () => {
    setImageName('')
  }

  return (
    <FormContainer>
      <MainTitle>Sign up</MainTitle>
      <FormContent handleSubmit={handleSubmit}>
        <FormUsername
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
          value={username}
        />
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
        <FormPassword
          label="Confirm Password"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setConfirmPassword(e.target.value)
          }
          value={confirmPassword}
        />
        <FormAvatar
          imageName={imageName}
          deleteImage={deleteImage}
          uploadImage={uploadImage}
        />
        <PrimaryButton fullWidth disabled={disabled} type="submit">
          {!disabled ? 'Sign up' : 'Signing up...'}
        </PrimaryButton>
      </FormContent>
      <Typography align="center" style={{ marginBottom: theme.spacing(2) }}>
        Already have an account. <Link to="/login">Login</Link>
      </Typography>
    </FormContainer>
  )
}

export default Signup
