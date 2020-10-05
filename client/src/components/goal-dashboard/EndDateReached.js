import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import NewEndDate from './NewEndDate'
import ReachedGoalDialog from './ReachedGoalDialog'

const EndDateReached = () => {
  return (
    <div>
      <ReachedGoalDialog />
      <NewEndDate />
    </div>
  )
}

export default EndDateReached
