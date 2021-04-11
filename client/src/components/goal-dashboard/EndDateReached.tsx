import { useState, useEffect } from 'react'
import { updateGoal } from '../../api/api_goals'
import CompletedGoal from './CompletedGoal'
import NewEndDate from './NewEndDate'
import ReachedGoalDialog from './ReachedGoalDialog'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { displayErrorSnackbar, updateSelectedGoal } from './../../redux'
import { Dialog } from '@material-ui/core'
import { Goal } from '../../types'

interface Props {
  goal: Goal
}

const EndDateReached = ({ goal }: Props) => {
  const [step, setStep] = useState(0)
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (goal.completed) setStep(2)
  }, [])

  const handleReached = async () => {
    try {
      setIsLoading(true)
      const res = await updateGoal(
        { completed: true },
        goal._id,
        moment().utcOffset()
      )

      if (res.success) {
        dispatch(updateSelectedGoal(res.data.goal))

        setStep(2)
      } else if (res.error) dispatch(displayErrorSnackbar(res.message))
    } catch (error) {
      dispatch(displayErrorSnackbar(error.message))
    } finally {
      setIsLoading(false)
    }
  }

  const handleNoReached = () => {
    setStep(1)
  }

  const handlePrevious = () => {
    setStep(step > 1 ? 1 : goal.completed ? 2 : 0)
  }

  return (
    <Dialog open={true} aria-labelledby="alert-dialog-title">
      {step === 0 ? (
        <ReachedGoalDialog
          handleReached={handleReached}
          handleNoReached={handleNoReached}
          isLoading={isLoading}
        />
      ) : step === 1 ? (
        <NewEndDate handlePrevious={handlePrevious} />
      ) : (
        <CompletedGoal handlePrevious={handlePrevious} />
      )}
    </Dialog>
  )
}

export default EndDateReached
