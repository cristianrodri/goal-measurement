import React, { useContext } from 'react'
import {
  makeStyles,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText
} from '@material-ui/core'
import { GlobalContext } from '../../context/Context'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center'
  },
  formControl: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  formLabel: {
    marginBottom: theme.spacing(1),
    textAlign: 'center'
  },
  radioGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  formControlLabel: {
    width: '50%',
    textTransform: 'capitalize'
  }
}))

const ChooseWeeklyReward = () => {
  const classes = useStyles()
  const { state, dispatchWeeklyReward } = useContext(GlobalContext)

  const handleChange = e => {
    dispatchWeeklyReward(e.target.value)
  }

  return (
    <div className={classes.container}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend" className={classes.formLabel}>
          Choose the day of your weekly reward
        </FormLabel>
        <RadioGroup
          aria-label="daysOfWeek"
          name="daysOfWeek"
          onChange={handleChange}
          className={classes.radioGroup}
          value={state.weeklyReward}
        >
          {Object.keys(state.activityDays).map((day, i) => (
            <FormControlLabel
              key={i + 1}
              value={day}
              control={<Radio />}
              label={day}
              className={classes.formControlLabel}
            />
          ))}
        </RadioGroup>
        <FormHelperText>
          * Weekly reward will be taken for medium reward only
        </FormHelperText>
      </FormControl>
    </div>
  )
}

export default ChooseWeeklyReward
