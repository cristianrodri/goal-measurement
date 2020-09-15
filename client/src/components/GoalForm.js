import React from 'react'
import PropTypes from 'prop-types'
import { Paper, makeStyles } from '@material-ui/core'
import { MainTitle } from './Title'
import {
  FormShortDescription,
  FormBigDescription
} from './goal-form/FormDescription'
import { FormDivider } from './Form'
import Activities from './goal-form/Activities'
import Rewards from './goal-form/Rewards'
import ChooseWeeklyReward from './goal-form/ChooseWeeklyReward'
import Date from './goal-form/Date'
import { PrimaryButton } from './Button'

const useStyles = makeStyles(theme => ({
  paper: {
    maxWidth: '45rem',
    margin: '0 auto',
    padding: '1rem'
  }
}))

const GoalForm = ({ type, handleSubmit, disabled }) => (
  <Paper className={useStyles().paper} elevation={2}>
    <MainTitle>{`${type} Goal`}</MainTitle>
    <form>
      <FormShortDescription />
      <FormBigDescription />
      <FormDivider />
      <Activities />
      <FormDivider />
      <Rewards />
      <FormDivider />
      <ChooseWeeklyReward />
      <FormDivider />
      <Date />
      <FormDivider />
      <PrimaryButton type="submit" disabled={disabled} onClick={handleSubmit}>
        {!disabled ? `${type} Goal` : 'Loading...'}
      </PrimaryButton>
    </form>
  </Paper>
)

GoalForm.propTypes = {
  type: PropTypes.oneOf(['Create', 'Edit']).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired
}

export default GoalForm
