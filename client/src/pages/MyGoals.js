import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles, Container } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Goals from '../components/Goals'
import { MainTitle } from '../components/Title'
import { PrimaryButton } from '../components/Button'
import { displayDialog } from '../redux'

const useStyles = makeStyles(theme => ({
  containerGoals: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    fontSize: theme.typography.h4.fontSize,
    color: theme.palette.primary.main
  },
  link: {
    position: 'fixed',
    bottom: 0,
    right: 0,
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}))

const MyGoals = props => {
  const goals = useSelector(state => state.goal.goals)
  const uncompletedGoals = goals.filter(goal => !goal.completed)
  const completedGoals = goals.filter(goal => goal.completed)
  const dispatch = useDispatch()
  const history = useHistory()
  const classes = useStyles()
  const { state } = props.location

  useEffect(() => {
    document.title = 'My Goals'

    if (state) {
      if (state['fromEditUser'] || state['fromDeleteGoal']) {
        dispatch(displayDialog(state.message))
        history.replace()
      }
    }
  }, [])

  return (
    <Container className={classes.container} maxWidth="md">
      <div className={classes.containerGoals}>
        {uncompletedGoals.length > 0 && (
          <>
            <MainTitle>My Goals</MainTitle>
            <Goals goals={uncompletedGoals} />
          </>
        )}
        {completedGoals.length > 0 && (
          <>
            <MainTitle>Completed Goals</MainTitle>
            <Goals goals={completedGoals} />
          </>
        )}
        <Link to="/create-goal" className={classes.link}>
          <PrimaryButton
            color="primary"
            variant="contained"
            className={classes.button}
          >
            <AddIcon fontSize="large" />
          </PrimaryButton>
        </Link>
      </div>
    </Container>
  )
}

export default MyGoals
