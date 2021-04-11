import { ComponentType } from 'react'
import {
  useTheme,
  Snackbar,
  SnackbarContent,
  IconButton
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { useSelector, useDispatch } from 'react-redux'
import { closeSnackbar, RootState } from '../redux'
import { CloseSnackbarAction } from '../redux/dialog/dialogTypes'
import { Dispatch } from 'redux'

interface Props {
  open: boolean
  type: 'success' | 'error'
}

const DisplaySnackbar = ({ open, type }: Props) => {
  const snackbarMessage = useSelector(
    (state: RootState) => state.dialog.snackbarMessage
  )
  const dispatch: Dispatch<CloseSnackbarAction> = useDispatch()

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      open={open}
      autoHideDuration={type === 'success' ? 2000 : 6000}
      onClose={() => dispatch(closeSnackbar())}
      disableWindowBlurListener
    >
      <SnackbarContent
        style={{
          backgroundColor: useTheme().palette[type].dark
        }}
        message={snackbarMessage}
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={() => dispatch(closeSnackbar())}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    </Snackbar>
  )
}

const withSnackbar = (Component: ComponentType<Props>) => (props: Props) => (
  <Component {...props} />
)

export const SuccessSnackbar = withSnackbar(DisplaySnackbar)
export const ErrorSnackbar = withSnackbar(DisplaySnackbar)
