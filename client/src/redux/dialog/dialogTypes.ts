export enum DialogTypes {
  SUCCESS_DIALOG = 'SUCCESS_DIALOG',
  CONFIRM_DIALOG = 'CONFIRM_DIALOG',
  CLOSE_DIALOG = 'CLOSE_DIALOG',
  SUCCESS_SNACKBAR = 'SUCCESS_SNACKBAR',
  ERROR_SNACKBAR = 'ERROR_SNACKBAR',
  CLOSE_SNACKBAR = 'CLOSE_SNACKBAR'
}

export interface DialogSuccessAction {
  type: DialogTypes.SUCCESS_DIALOG
  payload: string
}

export interface DialogConfirmAction {
  type: DialogTypes.CONFIRM_DIALOG
  payload: string
}

export interface DialogCloseAction {
  type: DialogTypes.CLOSE_DIALOG
}

export interface SuccessSnackbarAction {
  type: DialogTypes.SUCCESS_SNACKBAR
  payload: string
}

export interface ErrorSnackbarAction {
  type: DialogTypes.ERROR_SNACKBAR
  payload: string
}

export interface CloseSnackbarAction {
  type: DialogTypes.CLOSE_SNACKBAR
}

export type DialogAction =
  | DialogSuccessAction
  | DialogConfirmAction
  | DialogCloseAction
  | SuccessSnackbarAction
  | ErrorSnackbarAction
  | CloseSnackbarAction
