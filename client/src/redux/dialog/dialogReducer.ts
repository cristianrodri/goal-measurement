import { DialogTypes, DialogAction } from './dialogTypes'

const initialState = {
  successDialog: false,
  confirmDialog: false,
  dialogMessage: '',
  successSnackbar: false,
  errorSnackbar: false,
  snackbarMessage: ''
}

const dialogReducer = (
  state: typeof initialState = initialState,
  action: DialogAction
): typeof initialState => {
  switch (action.type) {
    case DialogTypes.SUCCESS_DIALOG:
      return {
        ...state,
        successDialog: true,
        dialogMessage: action.payload
      }
    case DialogTypes.CONFIRM_DIALOG:
      return {
        ...state,
        confirmDialog: true,
        dialogMessage: action.payload
      }
    case DialogTypes.CLOSE_DIALOG:
      return {
        ...state,
        successDialog: false,
        confirmDialog: false,
        dialogMessage: ''
      }
    case DialogTypes.SUCCESS_SNACKBAR:
      return {
        ...state,
        successSnackbar: true,
        snackbarMessage: action.payload
      }
    case DialogTypes.ERROR_SNACKBAR:
      return {
        ...state,
        errorSnackbar: true,
        snackbarMessage: action.payload
      }
    case DialogTypes.CLOSE_SNACKBAR:
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
