import React, { useEffect, useContext } from 'react'
import { makeStyles, Paper, Typography } from '@material-ui/core'
import { Link, useHistory } from 'react-router-dom'
import { GlobalContext } from '../context/Context'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    minHeight: '80vh',
    width: '100%',
    backgroundColor: 'inherit',
    [theme.breakpoints.up('md')]: {
      width: '50%'
    }
  },
  title: {
    color: theme.palette.primary.main
  },
  linksContainer: {
    paddingTop: '2rem'
  },
  signup: {
    marginRight: '1rem'
  },
  login: {},
  button: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.main,
    padding: '0.5em 1em',
    fontSize: '1.2rem',
    borderRadius: '1rem',
    transition: 'all .3s',
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark
    }
  }
}))

const Home = props => {
  const classes = useStyles()
  const { dispatchSuccessDialog } = useContext(GlobalContext)
  const history = useHistory()

  useEffect(() => {
    document.title = 'Goal Measurement'

    const init = () => {
      dispatchSuccessDialog(props.location.state['message'])
      history.replace() // delete fromDeletedUser and message properties
    }

    try {
      if (props.location.state['fromDeletedUser']) {
        init()
      }
    } catch {}

    // eslint-disable-next-line
  }, [])

  return (
    <Paper className={classes.root} elevation={0}>
      <Typography
        variant="h3"
        component="h1"
        className={classes.title}
        paragraph
      >
        Goal Measurement
      </Typography>
      <Typography className={classes.description} variant="h6">
        What do you want to achieve? To lose weight? To get a job? earn more
        money? to get more discipline? whatever you want to achieve, you should
        measure your progress. If you want to measure your goal making good
        habits every day, you're in the right place.
      </Typography>
      <Typography className={classes.linksContainer}>
        <Link to="/signup" className={`${classes.signup} ${classes.button}`}>
          Signup
        </Link>
        <Link to="/login" className={`${classes.login} ${classes.button}`}>
          Login
        </Link>
      </Typography>
    </Paper>
  )
}

export default Home
