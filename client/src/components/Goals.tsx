import { ComponentType } from 'react'
import { makeStyles, Typography, Grid, Theme } from '@material-ui/core'
import GoalCard from './GoalCard'
import { Goal } from '../types'

interface Props {
  goals: Goal[]
}

const useStyles = makeStyles((theme: Theme) => ({
  noGoals: {
    fontSize: theme.typography.h6.fontSize,
    marginBottom: theme.spacing(2),
    color: theme.palette.info.main,
    borderBottom: `1px solid currentColor`
  }
}))

const Goals = ({ goals }: Props) => (
  <Grid container spacing={3} justify="center" style={{ marginBottom: '1rem' }}>
    {goals.map(goal => (
      <GoalCard key={goal._id} goal={goal} />
    ))}
  </Grid>
)

const withEmptyGoals = (Component: ComponentType<Props>) => (props: Props) =>
  !props.goals.length ? (
    <Typography className={useStyles().noGoals}>No Goal</Typography>
  ) : (
    <Component {...props} />
  )

export default withEmptyGoals(Goals)
