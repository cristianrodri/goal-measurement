import React from 'react'
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
import { deleteActivitiy } from '../../redux'

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
  const activities = useSelector(state => state.goalForm.activities)
  const dispatch = useDispatch()

  const deleteActivity = e => {
    const button = e.target.closest('[aria-label="delete"]')
    if (!button) return

    const name = button.dataset.name

    // delete activity from the activities state
    deleteActivitiy(name)
  }

  return (
    <Grid className={classes.grid} container spacing={1}>
      {activities.map((activity, i) => (
        <Grid item key={i}>
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.cardActivity} variant="h6">
                {activity.activity}
              </Typography>
              <Typography className={classes.cardDays}>
                {Object.keys(activity.days)
                  .filter(day => activity.days[day])
                  .join(', ')}
              </Typography>
            </CardContent>
            <CardActions>
              <IconButton
                aria-label="delete"
                className={classes.iconButton}
                data-name={activity.activity}
                onClick={deleteActivity}
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
