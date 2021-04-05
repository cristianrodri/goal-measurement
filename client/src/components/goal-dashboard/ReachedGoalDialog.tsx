import React from 'react'
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from '@material-ui/core'
import Loading from '../Loading'

interface Props {
  handleNoReached: () => void
  handleReached: () => Promise<void>
  isLoading: boolean
}

const ReachedGoalDialog = ({
  handleNoReached,
  handleReached,
  isLoading
}: Props) => (
  <>
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
          <Button onClick={handleReached} color="primary">
            Yes, Of course
          </Button>
        </>
      )}
    </DialogActions>
  </>
)

export default ReachedGoalDialog
