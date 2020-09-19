import React from 'react'
import PropTypes from 'prop-types'
import {
  useTheme,
  Snackbar,
  SnackbarContent,
  IconButton
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { useSelector, useDispatch } from 'react-redux'
import { closeSnackbar } from '../redux'

const DisplaySnackbar = ({ open, type }) => {
  const snackbarMessage = useSelector(state => state.dialog.snackbarMessage)
  const dispatch = useDispatch()

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

DisplaySnackbar.propTypes = {
  open: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired
}

const withSnackbar = Component => props => <Component {...props} />

export const SuccessSnackbar = withSnackbar(DisplaySnackbar)
export const ErrorSnackbar = withSnackbar(DisplaySnackbar)
