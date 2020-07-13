import React, { useContext, useState, useEffect } from 'react'
import {
  makeStyles,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox
} from '@material-ui/core'
import moment from 'moment'
import { useCookies } from 'react-cookie'
import { SecondaryTitle } from '../Title'
import { GlobalContext } from '../../context/Context'
import { updatePerformance } from '../../api/api_performance'
import Progress from './Progress'
import { PrimaryButton } from './../Button'
import WorkDone from './WorkDone'

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
  const [cookies] = useCookies()
  const {
    state,
    dispatchAllPerformances,
    dispatchTodayPerformance,
    dispatchError,
    dispatchSuccess
  } = useContext(GlobalContext)
  const { activities, _id } = state.todayPerformance
  const [value, setValue] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  const percentageValue = (value, totalActivities) =>
    Math.floor((value / totalActivities.length) * 100)

  useEffect(() => {
    // calculate percentage about reached activities
    const reachedActivities = state.todayPerformance.activities.filter(
      activity => activity.reached
    ).length
    setValue(percentageValue(reachedActivities, activities))
  }, [])

  const handleChange = async e => {
    const id = e.target.dataset.id
    const prevActivities = activities.filter(activity => activity._id !== id)
    const updatedActivity = activities.filter(
      activity => activity._id === id
    )[0]

    updatedActivity.reached = e.target.checked

    const updatedTodayPerformance = {
      ...state.todayPerformance,
      activities: [...prevActivities, updatedActivity].sort((a, b) =>
        a._id < b._id ? -1 : 1
      )
    }

    dispatchTodayPerformance(updatedTodayPerformance)

    // calculate percentage about reached activities
    const reachedActivities = activities.filter(activity => activity.reached)
      .length
    setValue(percentageValue(reachedActivities, activities))

    try {
      const res = await updatePerformance(
        cookies.token,
        state.goalId,
        _id,
        updatedTodayPerformance
      )

      if (res.success) {
        dispatchSuccess('Saved')
      } else if (res.error) {
        dispatchError(res.message)
      }
    } catch (error) {
      dispatchError(error.message)
    }
  }

  // change 'done' value in todayPerformance global state to true when 100% is reached and change the UI component to 'WorkDone component'
  const handleDone = async () => {
    const updatedTodayPerformance = {
      ...state.todayPerformance,
      done: true
    }

    try {
      setIsUploading(true)
      const res = await updatePerformance(
        cookies.token,
        state.goalId,
        _id,
        updatedTodayPerformance
      )

      if (res.success) {
        dispatchTodayPerformance(res.data)
        dispatchAllPerformances([...state.allPerformances, res.data])
      } else if (res.error) {
        dispatchError(res.message)
      }
    } catch (error) {
      dispatchError(error.message)
    } finally {
      setIsUploading(false)
    }
  }

  if (state.todayPerformance.done) return <WorkDone />

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
