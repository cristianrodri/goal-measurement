import React from 'react'
import { makeStyles, Container } from '@material-ui/core'
import { SecondaryTitle } from '../Title'
import DaysCalendar from './DaysCalendar'
import HistoricPerformances from './HistoricPerformances'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'no-wrap',
    padding: 0,
    '& > *': {
      display: 'grid',
      gridTemplateRows: 'repeat(7, 20px)',
      gridGap: 3
    }
  }
}))

const Calendar = () => {
  const classes = useStyles()
  return (
    <div>
      <SecondaryTitle>Historic Performance</SecondaryTitle>
      <Container className={classes.container}>
        <DaysCalendar />
        <HistoricPerformances />
      </Container>
    </div>
  )
}

export default Calendar
