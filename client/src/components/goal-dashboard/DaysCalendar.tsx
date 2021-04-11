import { makeStyles, Theme, Typography } from '@material-ui/core'
import { firstItemToLast } from '../../utils/arrays'
import { weekDays } from '../../utils/dates'
import { DaysOfWeek, WeekDays } from '../../types'
import { textCapitalize } from '../../utils/text'

const useStyles = makeStyles((theme: Theme) => ({
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
  const days = firstItemToLast(weekDays) as WeekDays[]

  return (
    <div className={classes.containerDays}>
      {days.map((day: keyof DaysOfWeek) => (
        <Typography
          key={weekDays.indexOf(day)}
          className={classes.day}
          color="secondary"
          variant="body2"
          align="center"
        >
          {textCapitalize(day.slice(0, 3))}
        </Typography>
      ))}
    </div>
  )
}

export default DaysCalendar
