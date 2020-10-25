import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles, Typography, Grid } from '@material-ui/core'
import GoalCard from './GoalCard'

const useStyles = makeStyles(theme => ({
  noGoals: {
    fontSize: theme.typography.h6.fontSize,
    marginBottom: theme.spacing(2),
    color: theme.palette.tertiary.main,
    borderBottom: `1px solid currentColor`
  }
}))

const Goals = ({ goals }) => (
  <Grid container spacing={3} justify="center" style={{ marginBottom: '1rem' }}>
    {goals.map(goal => (
      <GoalCard key={goal._id} goal={goal} />
    ))}
  </Grid>
)

Goals.propTypes = {
  goals: PropTypes.array.isRequired
}

const withEmptyGoals = Component => props =>
  !props.goals.length ? (
    <Typography className={useStyles().noGoals}>No Goal</Typography>
  ) : (
    <Component {...props} />
  )

export default withEmptyGoals(Goals)
