import React, { useState, useContext, useEffect } from 'react'
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
import { GlobalContext } from '../../context/Context'
import { PropTypes } from 'prop-types'

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

const PrintRewards = props => {
  const classes = useStyles()
  const [value, setValue] = useState('')
  const [type, setType] = useState('')
  const [rewardType, setRewardType] = useState('')
  const { state } = useContext(GlobalContext)

  useEffect(() => {
    if (props.type === 'week') {
      setType('week')
      setRewardType('medium')
    } else {
      setType('day')
      setRewardType('small')
    }
  }, [])

  const handleChange = e => {
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
      {value && (
        <Typography align="center" gutterBottom>
          You've chosen <strong>{value}</strong>
        </Typography>
      )}
    </div>
  )
}

PrintRewards.propTypes = {
  type: PropTypes.string.isRequired
}

export default PrintRewards
