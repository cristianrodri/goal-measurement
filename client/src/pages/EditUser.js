import React, { useEffect, useContext, useState } from 'react'
import { makeStyles, CardMedia } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { GlobalContext } from '../context/Context'
import { updateUser, userAvatar } from '../api/api_user'
import {
  FormContainer,
  FormUsername,
  FormEmail,
  FormContent,
  FormAvatar
} from '../components/Form'
import { MainTitle } from '../components/Title'
import { PrimaryButton } from '../components/Button'

const useStyles = makeStyles(theme => ({
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
  const [cookies] = useCookies()
  const history = useHistory()
  const classes = useStyles()
  const {
    state,
    dispatchUserData,
    dispatchChangeAvatar,
    dispatchError
  } = useContext(GlobalContext)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [hasAvatar, setHasAvatar] = useState(false)
  const [image, setImage] = useState(undefined)
  const [imageName, setImageName] = useState('')
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    document.title = 'Edit User'

    setUsername(state.user.username)
    setEmail(state.user.email)
    setHasAvatar(!!state.avatar)

    // eslint-disable-next-line
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    setDisabled(true)

    const formData = new FormData()
    formData.append('username', username)
    formData.append('email', email)
    if (image) {
      formData.append('avatar', image)
    }
    // check if the avatar was uploaded or not. In case avatar was not uploaded (!image), the avatar existing or not in DB, will be deleted
    formData.append('deleteAvatar', !image)

    try {
      const data = await updateUser(cookies.token, formData)

      // if change came from 'update user' api
      if (data.success) {
        dispatchUserData(data.user)

        // user has changed his avatar
        if (data.hasChangedAvatar) {
          const avatar = await userAvatar(data.user._id)

          if (avatar.status === 200) {
            dispatchChangeAvatar('')
            dispatchChangeAvatar(avatar.url)
          } else if (avatar.status === 404) dispatchChangeAvatar('')
        }

        history.push('/my-goals', { fromEditUser: true, message: data.message })
      } else if (data.error) {
        dispatchError(data.message)
        setDisabled(false)
      }
    } catch (error) {
      dispatchError(error.message)
      setDisabled(false)
    }
  }

  const uploadImage = e => {
    setImage(e.target.files[0])
    setImageName(e.target.files[0].name)
  }

  const deleteImage = () => {
    setHasAvatar(false)
  }

  return (
    <FormContainer>
      <MainTitle>Edit User</MainTitle>
      <FormContent handleSubmit={handleSubmit}>
        <FormUsername
          onChange={e => setUsername(e.target.value)}
          value={username}
        />
        <FormEmail onChange={e => setEmail(e.target.value)} value={email} />
        {!hasAvatar && (
          <FormAvatar
            imageName={imageName}
            setImageName={setImageName}
            uploadImage={uploadImage}
          />
        )}
        {hasAvatar && (
          <CardMedia
            image={state.avatar}
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
