import React, { MouseEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  makeStyles,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Typography
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import { deleteActivitiy, RootState } from '../../redux'
import { DaysOfWeek, GoalFormActivities } from '../../types'

const useStyles = makeStyles(theme => ({
  grid: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, 14rem)'
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  cardActivity: {
    textTransform: 'capitalize'
  },
  cardDays: {
    fontSize: theme.typography.body2.fontSize,
    textAlign: 'left',
    color: theme.palette.grey[500]
  },
  iconButton: {
    padding: '0.2em',
    display: 'block',
    marginLeft: 'auto'
  }
}))

const GridActivities = () => {
  const classes = useStyles()
  const activities = useSelector(
    (state: RootState) => state.goalForm.activities
  ) as GoalFormActivities[]
  const dispatch = useDispatch()

  const deleteActivity = (activityName: string) => (
    e: MouseEvent<HTMLButtonElement>
  ) => {
    const button = e.currentTarget.closest('[aria-label="delete"]')
    if (!button) return

    // delete activity from the activities state
    dispatch(deleteActivitiy(activityName))
  }

  return (
    <Grid className={classes.grid} container spacing={1}>
      {activities.map(activity => (
        <Grid item key={activity.activity}>
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.cardActivity} variant="h6">
                {activity.activity}
              </Typography>
              <Typography className={classes.cardDays}>
                {Object.keys(activity.days)
                  .filter(day => activity.days[day as keyof DaysOfWeek])
                  .join(', ')}
              </Typography>
            </CardContent>
            <CardActions>
              <IconButton
                aria-label="delete"
                className={classes.iconButton}
                onClick={deleteActivity(activity.activity)}
                title="Delete activity"
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default GridActivities
