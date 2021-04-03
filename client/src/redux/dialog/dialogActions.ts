import {
  CloseSnackbarAction,
  DialogCloseAction,
  DialogConfirmAction,
  DialogSuccessAction,
  DialogTypes,
  ErrorSnackbarAction,
  SuccessSnackbarAction
} from './dialogTypes'

export const displayDialog = (message: string): DialogSuccessAction => {
  return {
    type: DialogTypes.SUCCESS_DIALOG,
    payload: message
  }
}

export const confirmDialog = (message: string): DialogConfirmAction => {
  return {
    type: DialogTypes.CONFIRM_DIALOG,
    payload: message
  }
}

export const closeDialog = (): DialogCloseAction => {
  return {
    type: DialogTypes.CLOSE_DIALOG
  }
}

export const displaySuccessSnackbar = (
  message: string
): SuccessSnackbarAction => {
  return {
    type: DialogTypes.SUCCESS_SNACKBAR,
    payload: message
  }
}

export const displayErrorSnackbar = (message: string): ErrorSnackbarAction => {
  return {
    type: DialogTypes.ERROR_SNACKBAR,
    payload: message
  }
}

export const closeSnackbar = (): CloseSnackbarAction => {
  return {
    type: DialogTypes.CLOSE_SNACKBAR
  }
}
