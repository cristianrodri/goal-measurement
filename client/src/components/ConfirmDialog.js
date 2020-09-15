import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { closeDialog } from '../redux'
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@material-ui/core'

const ConfirmDialog = ({ confirmAction }) => {
  const state = useSelector(state => state.dialog)
  const dispatch = useDispatch()

  return (
    <Dialog
      open={state.confirmDialog}
      onClose={() => dispatch(closeDialog())}
      transitionDuration={{ exit: 0 }}
    >
      <DialogContent>
        <DialogContentText>{state.dialogMessage}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={confirmAction}>
          Confirm
        </Button>
      </DialogActions>
      <DialogActions>
        <Button color="secondary" onClick={() => dispatch(closeDialog())}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

ConfirmDialog.propTypes = {
  confirmAction: PropTypes.func.isRequired
}

export default ConfirmDialog
