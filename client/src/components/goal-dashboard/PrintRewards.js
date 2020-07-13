import React, { useState, useContext } from 'react'
import {
  makeStyles,
  Paper,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { GlobalContext } from '../../context/Context'

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

const PrintRewards = () => {
  const classes = useStyles()
  const [value, setValue] = useState('')
  const { state } = useContext(GlobalContext)

  const handleChange = e => {
    setValue(e.target.value)
  }

  return (
    <div className={classes.root}>
      <Alert severity="success" variant="filled">
        Congrats! You did an excellent job this week, give yourself a weekly
        reward
      </Alert>
      <Paper className={classes.paper}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Weekly Rewards</FormLabel>
          <RadioGroup
            aria-label="weekly-reward"
            name="weekly-reward"
            value={value}
            onChange={handleChange}
          >
            {state.rewards.medium.map((reward, i) => (
              <FormControlLabel
                key={i}
                value={reward}
                control={<Radio />}
                label={reward}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Paper>
    </div>
  )
}

export default PrintRewards
