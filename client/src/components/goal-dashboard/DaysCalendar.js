import React from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import moment from 'moment'

const useStyles = makeStyles(theme => ({
  containerDays: {
    alignItems: 'center'
  },
  day: {
    backgroundColor: theme.palette.primary.main,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    margin: 0
  }
}))

const DaysCalendar = () => {
  const classes = useStyles()
  const daysOfTheWeek = moment()._locale._weekdaysShort // sun to sat
  const days = daysOfTheWeek.slice(1)
  days.push(daysOfTheWeek[0])

  return (
    <div className={classes.containerDays}>
      {days.map(day => (
        <Typography
          key={daysOfTheWeek.indexOf(day)}
          className={classes.day}
          color="secondary"
          variant="body2"
          align="center"
        >
          {day}
        </Typography>
      ))}
    </div>
  )
}

export default DaysCalendar
