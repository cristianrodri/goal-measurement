import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  makeStyles,
  FormControl,
  FormGroup,
  FormLabel,
  FormControlLabel,
  Checkbox,
  TextField
} from '@material-ui/core'
import { SecondaryTitle } from '../Title'
import { PrimaryButton, SelectionButton } from '../Button'
import AddIcon from '@material-ui/icons/Add'
import {
  setActivityName,
  selectAllDays,
  emptyActivity,
  addActivitiy,
  setActivityDays,
  unselectAllDays
} from '../../redux'
import { textCapitalize } from './../../utils/text'

const useStyles = makeStyles(theme => ({
  fieldset: {
    margin: '1rem 0'
  },
  selectedButton: {
    marginRight: theme.spacing(2)
  }
}))

const FormActivity = () => {
  const classes = useStyles()
  const { activityName, activityDays } = useSelector(state => state.goalForm)
  const dispatch = useDispatch()

  const handleSubmit = () => {
    dispatch(addActivitiy())
    dispatch(emptyActivity())
  }

  return (
    <FormControl>
      <SecondaryTitle>Define your Activities</SecondaryTitle>
      <FormGroup>
        <TextField
          label="Activity"
          inputProps={{ maxLength: 50 }}
          variant="outlined"
          value={activityName}
          onChange={e => dispatch(setActivityName(e.target.value))}
        />
        <FormControl component="fieldset" className={classes.fieldset}>
          <FormLabel component="legend">Days of the week</FormLabel>
          <FormGroup row>
            {Object.keys(activityDays).map((day, i) => (
              <FormControlLabel
                key={i}
                control={
                  <Checkbox
                    checked={activityDays[day]}
                    onChange={e => dispatch(setActivityDays(day))}
                    value={day}
                  />
                }
                label={textCapitalize(day)}
              />
            ))}
          </FormGroup>
          <div style={{ display: 'grid', gridGap: '1rem' }}>
            <SelectionButton
              onClick={() => dispatch(selectAllDays())}
              className={classes.selectedButton}
              disabled={Object.keys(activityDays).every(
                day => activityDays[day]
              )}
            >
              Select All
            </SelectionButton>
            <SelectionButton
              onClick={() => dispatch(unselectAllDays())}
              disabled={
                !Object.keys(activityDays).some(day => activityDays[day])
              }
            >
              Unselect All
            </SelectionButton>
          </div>
        </FormControl>
      </FormGroup>
      <PrimaryButton onClick={handleSubmit}>
        <AddIcon />
        Add Activity
      </PrimaryButton>
    </FormControl>
  )
}

export default FormActivity
