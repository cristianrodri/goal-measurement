import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import CompletedGoal from './CompletedGoal'
import NewEndDate from './NewEndDate'
import ReachedGoalDialog from './ReachedGoalDialog'
import moment from 'moment'

const EndDateReached = () => {
  const endGoalDate = useSelector(state => state.goal.selectedGoal.end)
  const isEndGoalDate = moment().isSameOrAfter(
    moment(endGoalDate).startOf('day')
  )
  const [step, setStep] = useState(0)

  const handleReached = () => {
    setStep(2)
  }

  const handleNoReached = () => {
    setStep(1)
  }

  if (isEndGoalDate) return null
  else {
    switch (step) {
      case 0:
        return (
          <ReachedGoalDialog
            handleReached={handleReached}
            handleNoReached={handleNoReached}
          />
        )
      case 1:
        return <NewEndDate />
      case 2:
        return <CompletedGoal />
    }
  }
}

export default EndDateReached
