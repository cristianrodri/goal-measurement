import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
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
import { goalPerformancePercentage } from './../../redux/goal/goalActions'
import { setPreviousPerformance } from './../../redux/performance/performanceActions'

const useStyles = makeStyles(theme => ({
  container: {
    maxWidth: 420,
    margin: '0 auto'
  },
  formControl: {
    margin: theme.spacing(3)
  }
}))

const WorkingPerformance = ({ performance, isToday, lastPositionIndex }) => {
  const classes = useStyles()
  const goal = useSelector(state => state.goal.selectedGoal)
  const dispatch = useDispatch()
  const { activities, _id } = performance
  const [value, setValue] = useState(0)
  const [toReward, setToReward] = useState(false)

  const percentageValue = (value, totalActivities) =>
    Math.floor((value / totalActivities.length) * 100)

  useEffect(() => {
    // calculate percentage about reached activities
    const reachedActivities = activities.filter(activity => activity.reached)
      .length
    setValue(percentageValue(reachedActivities, activities))

    if (isToday && percentageValue(reachedActivities, activities) === 100)
      setToReward(true)
  }, [isToday])

  const handleChange = async e => {
    const id = e.target.dataset.id
    const prevActivities = activities.filter(activity => activity._id !== id)

    // capture updated activity by id and change its "reached" by checked event target
    const updatedActivity = activities.filter(
      activity => activity._id === id
    )[0]

    updatedActivity.reached = e.target.checked

    const updatedActivities = [...prevActivities, updatedActivity]
    const percentage = percentageValue(
      updatedActivities.filter(activity => activity.reached).length,
      updatedActivities
    )

    // update activities in todayPerformances state and dispatch the changes
    const updatedPerformance = {
      ...performance,
      activities: updatedActivities.sort((a, b) => (a._id < b._id ? -1 : 1)),
      done: percentage === 100
    }

    //////////////////////////////////// UPDATE TODAY OR PREVIOUS PERFORMANCE (YESTERDAY) //////////////////////////////////
    if (isToday) {
      dispatch(setTodayPerformance(updatedPerformance))

      // update border card of the goal
      dispatch(goalPerformancePercentage(goal._id, percentage))
    } else {
      dispatch(setPreviousPerformance(performance, lastPositionIndex))
    }

    // calculate percentage when reached activities is changed
    const reachedActivities = activities.filter(activity => activity.reached)
      .length
    setValue(percentageValue(reachedActivities, activities))

    try {
      const res = await updatePerformanceDay(goal._id, _id, {
        done: updatedPerformance.done,
        activities: updatedPerformance.activities
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

  const handleDone = async () => {
    dispatch(addLastPerformance(performance))

    setToReward(true)
  }

  if (toReward && isToday) return <PrintRewards type="day" />

  return (
    <div className={classes.container}>
      <SecondaryTitle>
        {moment(performance.date).format('dddd LL')}
      </SecondaryTitle>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">
          You did your activitites {isToday ? 'Today' : 'Yesterday'}?
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
        {value === 100 && isToday && (
          <PrimaryButton color="secondary" onClick={handleDone}>
            Well done!
          </PrimaryButton>
        )}
      </FormControl>
    </div>
  )
}

WorkingPerformance.defaultProps = {
  isToday: false
}

WorkingPerformance.propTypes = {
  performance: PropTypes.object.isRequired,
  isToday: PropTypes.bool,
  lastPositionIndex: PropTypes.number
}

export default WorkingPerformance
