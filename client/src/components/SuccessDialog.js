import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@material-ui/core'
import { closeDialog } from '../redux'

const SuccessDialog = () => {
  const state = useSelector(state => state.dialog)
  const dispatch = useDispatch()

  return (
    <Dialog
      open={state.successDialog}
      onClose={() => dispatch(closeDialog())}
      transitionDuration={{ enter: 0 }}
    >
      <DialogContent>
        <DialogContentText>{state.dialogMessage}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={() => dispatch(closeDialog())}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SuccessDialog
