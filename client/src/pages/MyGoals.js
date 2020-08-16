import React, { useEffect, useState, useContext } from 'react'
import { useCookies } from 'react-cookie'
import { makeStyles, Container, Typography, useTheme } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { getGoals } from '../api/api_goals'
import { GlobalContext } from '../context/Context'
import Goals from '../components/AllGoals'
import { MainTitle } from '../components/Title'
import { PrimaryButton } from '../components/Button'

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
  const [cookies] = useCookies()
  const history = useHistory()
  const classes = useStyles()
  const theme = useTheme()
  const token = cookies.token
  const { dispatchSuccessDialog, dispatchError } = useContext(GlobalContext)
  const [isLoading, setIsLoading] = useState(true)
  const [userGoals, setUserGoals] = useState([])

  useEffect(() => {
    document.title = 'My Goals'

    const init = async () => {
      try {
        if (props.location.state) {
          if (
            props.location.state['fromEditUser'] ||
            props.location.state['fromDeleteGoal']
          ) {
            dispatchSuccessDialog(props.location.state.message)
            history.replace() // delete fromEditUser property
          }
        }

        const data = await getGoals(token)
        setIsLoading(false)
        setUserGoals(data.data)
      } catch (error) {
        dispatchError(error.message)
      }
    }

    init()
    // eslint-disable-next-line
  }, [])

  return (
    <Container className={classes.container} maxWidth="md">
      <div className={classes.containerGoals}>
        <MainTitle>My Goals</MainTitle>
        <Goals goals={userGoals} isLoading={isLoading} />
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
