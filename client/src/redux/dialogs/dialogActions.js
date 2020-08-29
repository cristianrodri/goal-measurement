import {
  SUCCESS_DIALOG,
  CONFIRM_DIALOG,
  CLOSE_DIALOG,
  SUCCESS_SNACKBAR,
  ERROR_SNACKBAR,
  CLOSE_SNACKBAR
} from './dialogTypes'

export const displayDialog = message => {
  return {
    type: SUCCESS_DIALOG,
    message
  }
}

export const confirmDialog = message => {
  return {
    type: CONFIRM_DIALOG,
    message
  }
}

export const closeDialog = () => {
  return {
    type: CLOSE_DIALOG
  }
}

export const displaySuccessSnackbar = message => {
  return {
    type: SUCCESS_SNACKBAR,
    message
  }
}

export const displayErrorSnackbar = message => {
  return {
    type: ERROR_SNACKBAR,
    message
  }
}

export const closeSnackbar = () => {
  return {
    type: CLOSE_SNACKBAR
  }
}
