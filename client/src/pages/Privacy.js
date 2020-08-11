import React, { useState, useEffect, useContext } from 'react'
import {
  makeStyles,
  useTheme,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@material-ui/core'
import { useCookies } from 'react-cookie'
import { useHistory } from 'react-router-dom'
import { updatePassword, deleteUser } from '../api/api_user'
import { FormContainer, FormContent, FormPassword } from '../components/Form'
import { MainTitle } from '../components/Title'
import { GlobalContext } from '../context/Context'
import { DeleteButton, PrimaryButton } from './../components/Button'

const useStyles = makeStyles(theme => ({
  buttonDelete: {
    margin: theme.spacing(1)
  }
}))

const Privacy = () => {
  const classes = useStyles()
  const theme = useTheme()
  const history = useHistory()
  const { dispatchError, dispatchSuccessDialog } = useContext(GlobalContext)
  const [cookies, , removeCookie] = useCookies()
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [confirmDialog, setConfirmDialog] = useState(false)
  const [passwordToDelete, setPasswordToDelete] = useState('')
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    document.title = 'Privacy'
  }, [])

  // handle changed password
  const handleSubmit = async e => {
    e.preventDefault()
    setDisabled(true)

    if (!newPassword || !confirmPassword || newPassword !== confirmPassword) {
      dispatchError('Your passwords must be equals')
      return
    }

    try {
      const data = await updatePassword(cookies.token, {
        password,
        newPassword
      })

      if (data.success) {
        dispatchSuccessDialog(data.message)

        const passwordState = [setPassword, setNewPassword, setConfirmPassword]

        // empty inputs
        passwordState.forEach(eachState => eachState(''))
      } else if (data.error) dispatchError(data.message)
    } catch (error) {
      dispatchError(error.message)
    } finally {
      setDisabled(false)
    }
  }

  const openConfirmDialog = () => {
    setConfirmDialog(true)
  }

  // handle deleted account
  const handleDeleteAccount = async e => {
    e.preventDefault()

    try {
      const data = await deleteUser(cookies.token, {
        password: passwordToDelete
      })

      // close confirm dialog
      closeConfirmDialog()

      // show success deleted dialog and redirect to /
      if (data.success) {
        removeCookie('token')
        removeCookie('user')
        history.push('/', { fromDeletedUser: true, message: data.message })
      } else if (data.error) {
        dispatchError(data.message)
      }
    } catch (error) {
      dispatchError(error.message)
    }
  }

  const closeConfirmDialog = () => {
    setConfirmDialog(false)
    setPasswordToDelete('')
  }

  return (
    <>
      {
        // Dialog that confirm your password for deleting account
        <Dialog open={confirmDialog} onClose={closeConfirmDialog} maxWidth="xs">
          <DialogContent
            style={{ padding: theme.spacing(1), paddingBottom: '0' }}
          >
            <DialogContentText>Confirm your password</DialogContentText>
          </DialogContent>
          <DialogActions>
            <form onSubmit={handleDeleteAccount}>
              <FormPassword
                label="Password"
                onChange={e => setPasswordToDelete(e.target.value)}
                value={passwordToDelete}
              />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: theme.spacing(2)
                }}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={closeConfirmDialog}
                  className={classes.buttonDelete}
                >
                  Keep Account
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  type="submit"
                  className={classes.buttonDelete}
                >
                  Delete Account
                </Button>
              </div>
            </form>
          </DialogActions>
        </Dialog>
      }
      <FormContainer>
        <MainTitle>Privacy</MainTitle>
        <FormContent handleSubmit={handleSubmit}>
          <FormPassword
            label="Current Password"
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
          <FormPassword
            label="New Password"
            onChange={e => setNewPassword(e.target.value)}
            value={newPassword}
          />
          <FormPassword
            label="Confirm Password"
            onChange={e => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
          <PrimaryButton fullWidth type="submit">
            Change Password
          </PrimaryButton>
          <DeleteButton onClick={openConfirmDialog} disabled={disabled}>
            Delete Account
          </DeleteButton>
        </FormContent>
      </FormContainer>
    </>
  )
}

export default Privacy
