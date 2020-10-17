import React, { useState, useEffect } from 'react'
import {
  makeStyles,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox
} from '@material-ui/core'
import moment from 'moment'
import { SecondaryTitle } from '../Title'
import Progress from './Progress'
import { PrimaryButton } from './../Button'
import PrintRewards from './PrintRewards'
import { useDispatch, useSelector } from 'react-redux'
import {
  setTodayPerformance,
  displaySuccessSnackbar,
  displayErrorSnackbar,
  addLastPerformance
} from '../../redux'
import { updatePerformanceDay } from './../../api/api_performance'
import { goalPerformanceDone } from './../../redux/goal/goalActions'

const useStyles = makeStyles(theme => ({
  container: {
    maxWidth: 420,
    margin: '0 auto'
  },
  formControl: {
    margin: theme.spacing(3)
  }
}))

const WorkingPerformance = () => {
  const classes = useStyles()
  const goal = useSelector(state => state.goal.selectedGoal)
  const todayPerformance = useSelector(
    state => state.performance.todayPerformance
  )
  const dispatch = useDispatch()
  const { activities, _id } = todayPerformance
  const [value, setValue] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  const percentageValue = (value, totalActivities) =>
    Math.floor((value / totalActivities.length) * 100)

  useEffect(() => {
    // calculate percentage about reached activities
    const reachedActivities = activities.filter(activity => activity.reached)
      .length
    setValue(percentageValue(reachedActivities, activities))
  }, [])

  const handleChange = async e => {
    const id = e.target.dataset.id
    const prevActivities = activities.filter(activity => activity._id !== id)

    // capture updated activity by id and change its "reached" by checked event target
    const updatedActivity = activities.filter(
      activity => activity._id === id
    )[0]

    updatedActivity.reached = e.target.checked

    // update activities in todayPerformances state and dispatch the changes
    const updatedTodayPerformance = {
      ...todayPerformance,
      activities: [...prevActivities, updatedActivity].sort((a, b) =>
        a._id < b._id ? -1 : 1
      )
    }

    dispatch(setTodayPerformance(updatedTodayPerformance))

    // calculate percentage when reached activities is changed
    const reachedActivities = activities.filter(activity => activity.reached)
      .length
    setValue(percentageValue(reachedActivities, activities))

    try {
      const res = await updatePerformanceDay(goal._id, _id, {
        done: updatedTodayPerformance.done,
        activities: updatedTodayPerformance.activities
      })

      if (res.success) {
        dispatch(displaySuccessSnackbar('Saved'))
      } else if (res.error) {
        dispatch(displayErrorSnackbar(res.message))
      }
    } catch (error) {
      dispatch(displayErrorSnackbar(error.message))
    }
  }

  // change 'done' value in todayPerformance global state to true when 100% is reached and change the UI component to 'WorkDone component'
  const handleDone = async () => {
    const updatedTodayPerformance = {
      ...todayPerformance,
      done: true
    }

    try {
      setIsUploading(true)
      const res = await updatePerformanceDay(goal._id, _id, {
        activities: updatedTodayPerformance.activities,
        done: updatedTodayPerformance.done
      })

      if (res.success) {
        dispatch(setTodayPerformance(res.data))
        dispatch(addLastPerformance(res.data))

        dispatch(goalPerformanceDone(goal._id))
      } else if (res.error) {
        dispatch(displayErrorSnackbar(res.message))
      }
    } catch (error) {
      dispatch(displayErrorSnackbar(error.message))
    } finally {
      setIsUploading(false)
    }
  }

  if (todayPerformance.done) return <PrintRewards type="day" />

  return (
    <div className={classes.container}>
      <SecondaryTitle>{moment().format('dddd LL')}</SecondaryTitle>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">
          You did your activitites today?
        </FormLabel>
        <FormGroup>
          {activities.map(activity => (
            <FormControlLabel
              key={activity._id}
              control={
                <Checkbox
                  checked={activity.reached}
                  onChange={handleChange}
                  name={activity.activity}
                  value={activity.activity}
                  inputProps={{
                    'data-id': activity._id
                  }}
                />
              }
              label={activity.activity}
            />
          ))}
        </FormGroup>
        <Progress value={value} variant="determinate" />
        {value === 100 && (
          <PrimaryButton color="secondary" onClick={handleDone}>
            {isUploading ? 'Uploading...' : 'Well done!'}
          </PrimaryButton>
        )}
      </FormControl>
    </div>
  )
}

export default WorkingPerformance
