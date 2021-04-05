import React, { FormEvent } from 'react'
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

interface Props {
  type: 'Create' | 'Edit'
  handleSubmit: (event: FormEvent) => Promise<void>
  disabled: boolean
}

const useStyles = makeStyles(() => ({
  paper: {
    maxWidth: '45rem',
    margin: '0 auto',
    padding: '1rem'
  }
}))

const GoalForm = ({ type, handleSubmit, disabled }: Props) => (
  <Paper className={useStyles().paper} elevation={2}>
    <MainTitle>{`${type} Goal`}</MainTitle>
    <form onSubmit={handleSubmit}>
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
      <PrimaryButton type="submit" disabled={disabled}>
        {!disabled ? `${type} Goal` : 'Loading...'}
      </PrimaryButton>
    </form>
  </Paper>
)

export default GoalForm
