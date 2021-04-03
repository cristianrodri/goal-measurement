import React, {
  ChangeEvent,
  ChangeEventHandler,
  FormEvent,
  useEffect,
  useState
} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles, CardMedia, Theme } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { updateUser } from '../api/api_user'
import {
  FormContainer,
  FormUsername,
  FormEmail,
  FormContent,
  FormAvatar
} from '../components/Form'
import { MainTitle } from '../components/Title'
import { PrimaryButton } from '../components/Button'
import {
  userData,
  userAvatar,
  displayErrorSnackbar,
  RootState
} from './../redux'
import { URL } from './../api/url'
import { useDocumentTitle } from './../hooks/useDocumentTitle'

const useStyles = makeStyles((theme: Theme) => ({
  cardMedia: {
    marginBottom: theme.spacing(2),
    width: '100%',
    height: '250px',
    borderRadius: '2px',
    transition: 'all .3s',
    cursor: 'pointer',
    position: 'relative',
    '&:hover::before': {
      content: '"Delete Image"',
      backgroundColor: `rgba(168, 168, 168, 0.5)`,
      fontWeight: theme.typography.fontWeightMedium
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '0',
      bottom: '0',
      left: '0',
      right: '0',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: '40',
      transition: 'all .3s'
    }
  }
}))

const EditUser = () => {
  const history = useHistory()
  const classes = useStyles()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [hasAvatar, setHasAvatar] = useState(false)
  const [image, setImage] = useState<File | null>(null)
  const [imageName, setImageName] = useState('')
  const [disabled, setDisabled] = useState(false)
  const user = useSelector((state: RootState) => state.user.user)
  const avatar = useSelector((state: RootState) => state.user.avatar)
  const dispatch = useDispatch()
  useDocumentTitle('Edit User')

  useEffect(() => {
    if (user) {
      setUsername(user.username)
      setEmail(user.email)
      setHasAvatar(!!avatar)
    }

    // eslint-disable-next-line
  }, [])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setDisabled(true)

    const formData = new FormData()
    formData.append('username', username)
    formData.append('email', email)
    if (image) {
      formData.append('avatar', image)
    }

    // check if the avatar was uploaded or not. In case avatar was not uploaded (!image), the avatar existing or not in DB, will be deleted
    formData.append('deleteAvatar', !image ? 'delete' : '')

    try {
      const data = await updateUser(formData)

      // if change came from 'update user' api
      if (data.success) {
        dispatch(userData(data.user))

        // user has changed his avatar
        if (data.hasChangedAvatar) {
          if (data.hasAvatar) {
            dispatch(userAvatar(''))
            dispatch(userAvatar(`${URL}/api/user/${data.user._id}/avatar`))
          } else {
            dispatch(userAvatar(''))
          }
        }

        history.push('/my-goals', {
          fromEditUser: true,
          message: data.message
        })
      } else if (data.error) {
        dispatch(displayErrorSnackbar(data.message))
        setDisabled(false)
      }
    } catch (error) {
      dispatch(displayErrorSnackbar(error.message))
      setDisabled(false)
    }
  }

  const uploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setImage(e.target.files[0])
      setImageName(e.target.files[0].name)
    }
  }

  const deleteImage = () => {
    setHasAvatar(false)
  }

  return (
    <FormContainer>
      <MainTitle>Edit User</MainTitle>
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
        {!hasAvatar && (
          <FormAvatar
            imageName={imageName}
            setImageName={setImageName}
            uploadImage={uploadImage}
          />
        )}
        {hasAvatar && (
          <CardMedia
            image={avatar}
            title="User avatar"
            className={classes.cardMedia}
            onClick={deleteImage}
          />
        )}
        <PrimaryButton disabled={disabled} type="submit">
          {!disabled ? 'Update User' : 'Updating...'}
        </PrimaryButton>
      </FormContent>
    </FormContainer>
  )
}

export default EditUser
