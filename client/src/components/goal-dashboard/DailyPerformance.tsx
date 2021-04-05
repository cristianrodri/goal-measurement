import React, { MouseEvent, useState } from 'react'
import { Popover, Typography, makeStyles, Theme } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { backgroundColors, progressColor, colors } from './../../utils/colors'
import { PerformanceActivity, PerformanceState } from '../../types'
import { RootState } from '../../redux'

interface Props {
  performance: PerformanceState
  index: number
}

type Classes = 'popover' | 'typography' | keyof typeof colors

const useStyles = makeStyles<Theme, Record<string, unknown>, Classes>(
  theme => ({
    popover: {
      pointerEvents: 'none'
    },
    typography: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: grey[100],
      padding: theme.spacing(1)
    },
    ...backgroundColors
  })
)

const DailyPerformance = ({ performance, index }: Props) => {
  const classes = useStyles({})
  const [anchorEl, setAnchorEl] = useState<HTMLSpanElement | null>(null)
  const selectedGoal = useSelector(
    (state: RootState) => state.goal.selectedGoal
  )

  const handlePopoverOpen = (e: MouseEvent<HTMLSpanElement>) => {
    setAnchorEl(e.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }
  const open = Boolean(anchorEl)

  const calculatePercentage = (activities: PerformanceActivity[]) => {
    if (!activities.length) return 0
    const reachedActivities = activities.filter(activity => activity.reached)
      .length

    return Math.floor((reachedActivities / activities.length) * 100)
  }

  return (
    <>
      <span
        key={moment(performance.date).unix()}
        className={
          classes[
            progressColor(
              calculatePercentage(performance.activities),
              performance.isWorkingDay
            )
          ]
        }
        style={{
          gridRow:
            index === 0
              ? moment(selectedGoal?.createdAt).day() !== 0
                ? moment(selectedGoal?.createdAt).day()
                : 7
              : 'auto'
        }}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      ></span>
      <Popover
        id="mouse-over-popover"
        anchorEl={anchorEl}
        open={open}
        className={classes.popover}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
      >
        <Typography
          aria-owns={open ? 'mouse-over-popover' : undefined}
          aria-haspopup="true"
          className={classes.typography}
        >
          {performance.isWorkingDay ? (
            `${calculatePercentage(performance.activities)}%`
          ) : (
            <small>No activities</small>
          )}
          <small>{moment(performance.date).format('dddd, DD-MMM-YYYY')}</small>
        </Typography>
      </Popover>
    </>
  )
}

export default DailyPerformance
