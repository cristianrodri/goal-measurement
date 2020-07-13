import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles, Typography, Paper } from '@material-ui/core'
import { Link } from 'react-router-dom'
import moment from 'moment'
import Loading from './Loading'

const useStyles = makeStyles(theme => ({
  paper: {
    margin: '1rem 0',
    padding: '0.5rem 0',
    width: '100%',
    backgroundColor: 'transparent'
  },
  containerGoal: {
    display: 'grid',
    gridTemplateColumns: 'minmax(auto, 1fr) 2fr 1fr',
    gridAutoRows: '1fr',
    gridGap: theme.gutter,
    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: '2fr auto'
    }
  },
  goal: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    height: '100%'
  },
  state: {
    justifySelf: 'start',
    alignSelf: 'center',
    backgroundColor: theme.palette.tertiary.main,
    padding: '0.2rem 1rem',
    borderRadius: '0.1rem',
    color: '#fff'
  },
  link: {
    cursor: 'pointer',
    color: 'inherit',
    padding: '0.5em',
    borderBottom: `1px solid ${theme.palette.grey[500]}`,
    gridColumn: '2 / 3',
    [theme.breakpoints.down('xs')]: {
      gridColumn: '1 / 2'
    },
    fontSize: theme.typography.body1.fontSize,
    transition: 'all .3s',
    '&:hover': {
      backgroundColor: theme.palette.grey[400]
    }
  },
  noGoals: {
    fontSize: theme.typography.h6.fontSize,
    marginBottom: theme.spacing(2),
    color: theme.palette.tertiary.main,
    borderBottom: `1px solid currentColor`
  }
}))

const AllGoals = ({ goals }) => {
  const classes = useStyles()

  return (
    <Paper className={classes.paper} elevation={0}>
      {goals.map(goal => (
        <div key={goal._id} className={classes.containerGoal}>
          <Link to={`/my-goals/${goal._id}`} className={classes.link}>
            <Typography className={classes.goal}>
              <span>{goal.shortDescription}</span>
              <span style={{ marginLeft: '0' }}>
                {moment(goal.end).format('MMMM Do YYYY')}
              </span>
            </Typography>
          </Link>
        </div>
      ))}
    </Paper>
  )
}

AllGoals.propTypes = {
  goals: PropTypes.array.isRequired
}

const withEmptyGoals = Component => props =>
  !props.goals.length ? (
    <Typography className={useStyles().noGoals}>No Goal</Typography>
  ) : (
    <Component {...props} />
  )

const withLoadingIndicator = Component => ({ isLoading, ...props }) =>
  !isLoading ? <Component {...props} /> : <Loading styledByParent />

const GoalsWithEmpty = withEmptyGoals(AllGoals)
const Goals = withLoadingIndicator(GoalsWithEmpty)

/**
 * <Goals
 *   goals={userGoals}
 *   isLoading={isLoading}
 * />
 */

export default Goals
