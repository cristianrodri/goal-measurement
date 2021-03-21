import React from 'react'
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  makeStyles
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { textCapitalize } from './../utils/text'
import { green } from '@material-ui/core/colors'
import DoneIcon from '@material-ui/icons/Done'
import { borderColors, progressColor } from '../utils/colors'

const useStyles = ({ isWorkingDay, performanceTodayPercentage }) =>
  makeStyles(theme => ({
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: `0 0 .1rem .2rem ${
        borderColors[progressColor(performanceTodayPercentage, isWorkingDay)]
      }`,
      '&:hover': {
        boxShadow: `0 0 .1rem .3rem ${
          borderColors[progressColor(performanceTodayPercentage, isWorkingDay)]
        }`
      },
      transition: 'all .2s',
      '&:active': {
        transform: 'scale(.95)'
      }
    },
    cardContent: {
      flexGrow: '1'
    },
    cardActions: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center'
    },
    link: {
      fontSize: '1rem'
    }
  }))

const GoalCard = ({
  goal: {
    _id,
    shortDescription,
    end,
    isWorkingDay,
    performanceTodayPercentage,
    completed
  }
}) => {
  const classes = useStyles({ isWorkingDay, performanceTodayPercentage })()
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Link to={`/my-goals/${_id}`} className={classes.link}>
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <Typography variant="h6" component="h2" gutterBottom>
              {textCapitalize(shortDescription)}
            </Typography>
          </CardContent>
          <CardActions className={classes.cardActions}>
            {completed && <DoneIcon style={{ color: green[500] }} />}
            <Typography variant="body2" component="p">
              {moment(end).format('MMMM Do YYYY')}
            </Typography>
          </CardActions>
        </Card>
      </Link>
    </Grid>
  )
}

export default GoalCard
