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
  unselectAllDays,
  RootState
} from '../../redux'
import { textCapitalize } from './../../utils/text'
import { DaysOfWeek } from '../../types'

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
  const { activityName, activityDays } = useSelector(
    (state: RootState) => state.goalForm
  )
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
            {Object.keys(activityDays).map(day => (
              <FormControlLabel
                key={day}
                control={
                  <Checkbox
                    checked={activityDays[day as keyof DaysOfWeek]}
                    onChange={() =>
                      dispatch(setActivityDays(day as keyof DaysOfWeek))
                    }
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
                day => activityDays[day as keyof DaysOfWeek]
              )}
            >
              Select All
            </SelectionButton>
            <SelectionButton
              onClick={() => dispatch(unselectAllDays())}
              disabled={
                !Object.keys(activityDays).some(
                  day => activityDays[day as keyof DaysOfWeek]
                )
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
