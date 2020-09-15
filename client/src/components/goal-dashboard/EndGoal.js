import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core'
// import ChangeEndDate from './ChangeEndDate'

const useStyles = makeStyles(theme => ({
  dateContainer: {
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'center'
  }
}))

const EndGoal = () => {
  const classes = useStyles()
  return (
    <div>
      <ChangeEndDate />
    </div>
  )
}

export default EndGoal
