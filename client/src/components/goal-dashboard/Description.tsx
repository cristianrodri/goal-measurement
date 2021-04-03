import React from 'react'
import { makeStyles, Paper, Theme } from '@material-ui/core'
import moment from 'moment'
import { textCapitalize } from './../../utils/text'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux'
import { Goal } from '../../types'

const useStyles = makeStyles((theme: Theme) => ({
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
  const { bigDescription, createdAt, rewards } = useSelector(
    (state: RootState) => state.goal.selectedGoal
  ) as Goal

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
        <span>
          {rewards.large.length ? textCapitalize(rewards.large[0]) : ''}
        </span>
      </div>
    </Paper>
  )
}

export default Description
