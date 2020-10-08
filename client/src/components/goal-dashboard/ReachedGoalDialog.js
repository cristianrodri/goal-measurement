import React from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from '@material-ui/core'
import Loading from '../Loading'

const ReachedGoalDialog = ({ handleNoReached, handleReached, isLoading }) => (
  <div>
    <Dialog
      open={true}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Deadline reached</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Deadline was reached. Did you achieve your goal?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {isLoading ? (
          <Loading styledByParent />
        ) : (
          <>
            <Button onClick={handleNoReached} color="primary">
              Not yet
            </Button>
            <Button onClick={handleReached} color="primary" autoFocus>
              Yes, Of course
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  </div>
)

export default ReachedGoalDialog
