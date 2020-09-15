import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles, Paper, Typography } from '@material-ui/core'
import { Link, useHistory } from 'react-router-dom'
import { displaySuccessSnackbar } from '../redux'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto',
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
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    document.title = 'Goal Measurement'

    const init = () => {
      dispatch(displaySuccessSnackbar(props.location.state['message']))
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
        align="center"
      >
        Goal Measurement
      </Typography>
      <Typography className={classes.description} variant="h6" align="center">
        If you want to measure your goal making good habits every day, you're in
        the right place.
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
