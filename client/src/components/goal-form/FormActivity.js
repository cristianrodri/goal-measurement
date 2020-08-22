import React, { useContext } from 'react'
import {
  makeStyles,
  FormControl,
  FormGroup,
  FormLabel,
  FormControlLabel,
  Checkbox
} from '@material-ui/core'
import { SecondaryTitle } from '../Title'
import { ActivityInput } from './FormDescription'
import { PrimaryButton, SelectionButton } from '../Button'
import AddIcon from '@material-ui/icons/Add'
import { GlobalContext } from '../../context/Context'

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
  const {
    state,
    dispatchActivityDays,
    dispatchAllDays,
    dispatchAddActivity,
    dispatchEmptyActivityDays
  } = useContext(GlobalContext)

  return (
    <FormControl>
      <SecondaryTitle>Define your Activities</SecondaryTitle>
      <FormGroup>
        <ActivityInput />
        <FormControl component="fieldset" className={classes.fieldset}>
          <FormLabel component="legend">Days of the week</FormLabel>
          <FormGroup row>
            {Object.keys(state.activityDays).map((day, i) => (
              <FormControlLabel
                key={i}
                control={
                  <Checkbox
                    checked={state.activityDays[day]}
                    onChange={e => dispatchActivityDays(day, e.target.checked)}
                    value={day}
                  />
                }
                label={day.charAt(0).toUpperCase() + day.slice(1)}
              />
            ))}
          </FormGroup>
          <div style={{ display: 'grid', gridGap: '1rem' }}>
            <SelectionButton
              onClick={dispatchAllDays}
              className={classes.selectedButton}
              disabled={Object.keys(state.activityDays).every(
                day => state.activityDays[day]
              )}
            >
              Select All
            </SelectionButton>
            <SelectionButton
              onClick={dispatchEmptyActivityDays}
              disabled={
                !Object.keys(state.activityDays).some(
                  day => state.activityDays[day]
                )
              }
            >
              Unselect All
            </SelectionButton>
          </div>
        </FormControl>
      </FormGroup>
      <PrimaryButton onClick={dispatchAddActivity}>
        <AddIcon />
        Add Activity
      </PrimaryButton>
    </FormControl>
  )
}

export default FormActivity
