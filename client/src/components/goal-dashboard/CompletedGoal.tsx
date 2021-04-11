import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../../redux'

const CompletedGoal: React.FC<{ handlePrevious: () => void }> = ({
  handlePrevious
}) => {
  const username = useSelector((state: RootState) => state.user.user?.username)
  return (
    <>
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
    </>
  )
}

export default CompletedGoal
