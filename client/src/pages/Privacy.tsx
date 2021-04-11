import { useState, FormEvent, ChangeEvent } from 'react'
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  DialogTitle
} from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { updatePassword, deleteUser } from '../api/api_user'
import { FormContainer, FormContent, FormPassword } from '../components/Form'
import { MainTitle } from '../components/Title'
import { DeleteButton, PrimaryButton } from './../components/Button'
import {
  displayErrorSnackbar,
  displayDialog,
  isAuthenticated,
  logout,
  resetGoals,
  resetPerformance,
  emptyForm
} from '../redux'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const Privacy = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [confirmDialog, setConfirmDialog] = useState(false)
  const [passwordToDelete, setPasswordToDelete] = useState('')
  const [disabled, setDisabled] = useState(false)
  useDocumentTitle('Privacy')

  // handle changed password
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setDisabled(true)

    if (!newPassword || !confirmPassword || newPassword !== confirmPassword) {
      dispatch(displayErrorSnackbar('Your passwords must be equals'))
      return
    }

    try {
      const data = await updatePassword({
        password,
        newPassword
      })

      if (data.success) {
        dispatch(displayDialog(data.message))

        const passwordState = [setPassword, setNewPassword, setConfirmPassword]

        // empty inputs
        passwordState.forEach(eachState => eachState(''))
      } else if (data.error) dispatch(displayErrorSnackbar(data.message))
    } catch (error) {
      dispatch(displayErrorSnackbar(error.message))
    } finally {
      setDisabled(false)
    }
  }

  const openConfirmDialog = () => {
    setConfirmDialog(true)
  }

  // handle deleted account
  const handleDeleteAccount = async (event: FormEvent) => {
    event.preventDefault()

    try {
      const data = await deleteUser({
        password: passwordToDelete
      })

      // close confirm dialog
      closeConfirmDialog()

      // show success deleted dialog and redirect to /
      if (data.success) {
        dispatch(isAuthenticated(false))
        history.push('/', { fromDeletedUser: true, message: data.message })

        dispatch(logout())
        dispatch(resetGoals())
        dispatch(resetPerformance())
        dispatch(emptyForm())
      } else if (data.error) {
        dispatch(displayErrorSnackbar(data.message))
      }
    } catch (error) {
      dispatch(displayErrorSnackbar(error.message))
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
        <Dialog open={confirmDialog} onClose={closeConfirmDialog}>
          <DialogTitle>Confirm your password</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete your account?
            </DialogContentText>
            <FormPassword
              label="Password"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPasswordToDelete(e.target.value)
              }
              value={passwordToDelete}
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              color="primary"
              onClick={closeConfirmDialog}
            >
              Keep Account
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleDeleteAccount}
            >
              Delete Account
            </Button>
          </DialogActions>
        </Dialog>
      }
      <FormContainer>
        <MainTitle>Privacy</MainTitle>
        <FormContent handleSubmit={handleSubmit}>
          <FormPassword
            label="Current Password"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            value={password}
          />
          <FormPassword
            label="New Password"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setNewPassword(e.target.value)
            }
            value={newPassword}
          />
          <FormPassword
            label="Confirm Password"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setConfirmPassword(e.target.value)
            }
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
