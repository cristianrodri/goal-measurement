import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles, Container, Theme } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { RouteComponentProps, Link } from 'react-router-dom'
import Goals from '../components/Goals'
import { MainTitle } from '../components/Title'
import { PrimaryButton } from '../components/Button'
import { displayDialog, RootState } from '../redux'
import { useDocumentTitle } from './../hooks/useDocumentTitle'

const useStyles = makeStyles((theme: Theme) => ({
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

const MyGoals = (
  props: RouteComponentProps<
    Record<string, never>,
    Record<string, never>,
    { fromEditUser: boolean; fromDeleteGoal: boolean; message: string }
  >
) => {
  const goals = useSelector((state: RootState) => state.goal.goals)
  const uncompletedGoals = goals.filter(goal => !goal.completed)
  const completedGoals = goals.filter(goal => goal.completed)
  const dispatch = useDispatch()
  const classes = useStyles()
  const { state } = props.location
  useDocumentTitle('My Goals')

  useEffect(() => {
    if (state?.fromEditUser || state?.fromDeleteGoal) {
      dispatch(displayDialog(state.message))
    }
  }, [])

  return (
    <Container maxWidth="md">
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
          <PrimaryButton>
            <AddIcon fontSize="large" />
          </PrimaryButton>
        </Link>
      </div>
    </Container>
  )
}

export default MyGoals
