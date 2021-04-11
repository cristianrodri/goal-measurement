import { useDispatch, useSelector } from 'react-redux'
import { closeDialog, RootState } from '../redux'
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@material-ui/core'

interface Props {
  confirmAction: () => void
}

const ConfirmDialog = ({ confirmAction }: Props) => {
  const state = useSelector((state: RootState) => state.dialog)
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

export default ConfirmDialog
