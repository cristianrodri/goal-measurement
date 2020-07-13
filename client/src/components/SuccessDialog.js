import React, { useContext } from 'react'
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@material-ui/core'
import { GlobalContext } from '../context/Context'

const SuccessDialog = () => {
  const { state, dispatchCloseDialog } = useContext(GlobalContext)

  return (
    <Dialog open={state.successDialog} onClose={dispatchCloseDialog} transitionDuration={{ enter: 0 }}>
      <DialogContent>
        <DialogContentText>{state.dialogMessage}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={dispatchCloseDialog}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SuccessDialog
