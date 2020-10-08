import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { updateGoal } from '../../api/api_goals'
import CompletedGoal from './CompletedGoal'
import NewEndDate from './NewEndDate'
import ReachedGoalDialog from './ReachedGoalDialog'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { displayErrorSnackbar, updateSelectedGoal } from './../../redux'

const EndDateReached = ({ goal }) => {
  const [step, setStep] = useState(0)
  const [cookies] = useCookies()
  const token = cookies.token
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
        token,
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
    setStep(step === 2 ? 1 : goal.completed ? 2 : 0)
  }

  switch (step) {
    case 0:
      return (
        <ReachedGoalDialog
          handleReached={handleReached}
          handleNoReached={handleNoReached}
          isLoading={isLoading}
        />
      )
    case 1:
      return <NewEndDate handlePrevious={handlePrevious} />
    case 2:
      return <CompletedGoal handlePrevious={handlePrevious} />
  }
}

export default EndDateReached
