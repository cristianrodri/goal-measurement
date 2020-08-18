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

const useStyles = makeStyles(theme => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    '&:hover': {
      boxShadow: '2px 2px 0 2px #888'
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

const GoalCard = ({ goal: { _id, shortDescription, end } }) => {
  const classes = useStyles()
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
