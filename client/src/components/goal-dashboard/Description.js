import React, { useContext } from 'react'
import { makeStyles, Paper } from '@material-ui/core'
import { GlobalContext } from '../../context/Context'
import moment from 'moment'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(3)
  },
  description: {
    marginBottom: theme.spacing(1),
    '& > span:first-child': {
      fontWeight: theme.typography.fontWeightBold
    }
  }
}))

const Description = () => {
  const classes = useStyles()
  const { state } = useContext(GlobalContext)
  const { bigDescription, createdAt, rewards } = state

  return (
    <Paper elevation={0} className={classes.paper}>
      <div className={classes.description}>
        <span>Big Description: </span>
        <span>{bigDescription}</span>
      </div>
      <div className={classes.description}>
        <span>Start: </span>
        <span>{moment(createdAt).format('LL')}</span>
      </div>
      <div className={classes.description}>
        <span>{`Big reward${rewards.large.length > 1 ? 's' : ''}:`} </span>
        <span>{rewards.large.map(bigReward => bigReward)}</span>
      </div>
    </Paper>
  )
}

export default Description
