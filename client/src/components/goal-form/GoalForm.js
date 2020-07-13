import React from 'react'
import { makeStyles, Paper } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  paper: {
    maxWidth: '45rem',
    margin: '0 auto',
    padding: '1rem'
  }
}))

const GoalForm = ({ children }) => (
  <Paper className={useStyles().paper} elevation={2}>
    {children}
  </Paper>
)

export default GoalForm
