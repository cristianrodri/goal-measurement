import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  makeStyles,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText
} from '@material-ui/core'
import moment from 'moment'
import { arrayOfStringLowercase, firstItemToLast } from '../../utils/arrays'
import { setWeeklyReward } from '../../redux'

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
  const weeklyReward = useSelector(state => state.goalForm.weeklyReward)
  const dispatch = useDispatch()
  const daysOfWeek = arrayOfStringLowercase(firstItemToLast(moment.weekdays())) // from monday to sunday

  return (
    <div className={classes.container}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend" className={classes.formLabel}>
          Choose the day of your weekly reward
        </FormLabel>
        <RadioGroup
          aria-label="daysOfWeek"
          name="daysOfWeek"
          onChange={e =>
            dispatch(setWeeklyReward(e.target.value.toLowerCase()))
          }
          className={classes.radioGroup}
          value={weeklyReward}
        >
          {daysOfWeek.map((day, i) => (
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
