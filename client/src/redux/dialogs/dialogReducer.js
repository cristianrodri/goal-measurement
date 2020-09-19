import {
  SUCCESS_DIALOG,
  CONFIRM_DIALOG,
  CLOSE_DIALOG,
  SUCCESS_SNACKBAR,
  ERROR_SNACKBAR,
  CLOSE_SNACKBAR
} from './dialogTypes'

const initialState = {
  successDialog: false,
  confirmDialog: false,
  dialogMessage: '',
  successSnackbar: false,
  errorSnackbar: false,
  snackbarMessage: ''
}

const dialogReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUCCESS_DIALOG:
      return {
        ...state,
        successDialog: true,
        dialogMessage: action.message
      }
    case CONFIRM_DIALOG:
      return {
        ...state,
        confirmDialog: true,
        dialogMessage: action.message
      }
    case CLOSE_DIALOG:
      return {
        ...state,
        successDialog: false,
        confirmDialog: false,
        dialogMessage: ''
      }
    case SUCCESS_SNACKBAR:
      return {
        ...state,
        successSnackbar: true,
        snackbarMessage: action.message
      }
    case ERROR_SNACKBAR:
      return {
        ...state,
        errorSnackbar: true,
        snackbarMessage: action.message
      }
    case CLOSE_SNACKBAR:
      return {
        ...state,
        successSnackbar: false,
        errorSnackbar: false,
        snackbarMessage: ''
      }

    default:
      return state
  }
}

export default dialogReducer
