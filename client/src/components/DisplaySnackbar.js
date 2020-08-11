import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import {
  useTheme,
  Snackbar,
  SnackbarContent,
  IconButton
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { GlobalContext } from '../context/Context'

const DisplaySnackbar = ({ open, type }) => {
  const { state, dispatchEmptySnackbar } = useContext(GlobalContext)

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      open={open}
      autoHideDuration={type === 'success' ? 3000 : 6000}
      onClose={dispatchEmptySnackbar}
      disableWindowBlurListener
    >
      <SnackbarContent
        style={{
          backgroundColor: useTheme().palette[type].dark
        }}
        message={state.snackbarMessage}
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={dispatchEmptySnackbar}
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
