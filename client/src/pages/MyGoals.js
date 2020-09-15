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
  const dispatch = useDispatch()
  const history = useHistory()
  const classes = useStyles()

  useEffect(() => {
    document.title = 'My Goals'

    if (props.location.state) {
      if (
        props.location.state['fromEditUser'] ||
        props.location.state['fromDeleteGoal']
      ) {
        dispatch(displayDialog(props.location.state.message))
        history.replace() // delete fromEditUser property
      }
    }
  }, [])

  return (
    <Container className={classes.container} maxWidth="md">
      <div className={classes.containerGoals}>
        <MainTitle>My Goals</MainTitle>
        <Goals goals={goals} />
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
