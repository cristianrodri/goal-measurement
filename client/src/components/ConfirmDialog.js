import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@material-ui/core'
import { GlobalContext } from '../context/Context'
import { FormPassword } from './Form'

const ConfirmDialog = ({ confirmAction }) => {
  const { state, dispatchCloseDialog } = useContext(GlobalContext)

  return (
    <Dialog
      open={state.confirmDialog}
      onClose={dispatchCloseDialog}
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
        <Button color="secondary" onClick={dispatchCloseDialog}>
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
