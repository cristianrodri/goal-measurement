import React, { useState, useEffect, ChangeEvent } from 'react'
import {
  makeStyles,
  Paper,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { textCapitalize } from './../../utils/text'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux'
import { Goal } from '../../types'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  paper: {
    alignSelf: 'center',
    margin: theme.spacing(2),
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}))

interface Props {
  type: 'day' | 'week'
}

const PrintRewards = ({ type }: Props) => {
  const classes = useStyles()
  const [value, setValue] = useState('')
  const [rewardType, setRewardType] = useState<'small' | 'medium' | ''>('')
  const selectedGoal = useSelector(
    (state: RootState) => state.goal.selectedGoal
  ) as Goal

  useEffect(() => {
    if (type === 'week') {
      setRewardType('medium')
    } else {
      setRewardType('small')
    }
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return (
    <div className={classes.root}>
      <Alert severity="success" variant="filled">
        Congrats! You did an excellent job this {type}, give yourself a reward
      </Alert>
      <Paper className={classes.paper}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Reward of the {type}</FormLabel>
          <RadioGroup
            aria-label="reward"
            name="reward"
            value={value}
            onChange={handleChange}
          >
            {rewardType &&
              selectedGoal.rewards[rewardType].map(reward => (
                <FormControlLabel
                  key={reward}
                  value={reward}
                  control={<Radio />}
                  label={textCapitalize(reward)}
                />
              ))}
          </RadioGroup>
        </FormControl>
      </Paper>
      {value && (
        <Typography align="center" gutterBottom>
          You've chosen <strong>{value}</strong>
        </Typography>
      )}
    </div>
  )
}

export default PrintRewards
