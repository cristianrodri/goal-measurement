import React from 'react'
import { useSelector } from 'react-redux'
import { SecondaryTitle } from '../Title'
import { Grid } from '@material-ui/core'
import Reward from './Reward'

const Rewards = () => {
  const { small, medium, large } = useSelector(state => state.goalForm.rewards)

  return (
    <div>
      <SecondaryTitle>Define your rewards</SecondaryTitle>
      <Grid container spacing={3} justify="center">
        <Reward name="Small" rewards={small} />
        <Reward name="Medium" rewards={medium} />
        <Reward name="Large" rewards={large} />
      </Grid>
    </div>
  )
}

export default Rewards
