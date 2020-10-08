import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const CompletedGoal = ({ handlePrevious }) => {
  const username = useSelector(state => state.user.user.username)
  return (
    <Dialog open={true} aria-labelledby="responsive-dialog-title">
      <DialogTitle id="responsive-dialog-title">
        {`Well done ${username}. You achieved your goal`}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Give yourself the big reward, in case you didn't
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handlePrevious} color="primary">
          Add new deadline
        </Button>
        <Link to="/my-goals">
          <Button color="primary">Go back to my my goals</Button>
        </Link>
      </DialogActions>
    </Dialog>
  )
}

export default CompletedGoal
