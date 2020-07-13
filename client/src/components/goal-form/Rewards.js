import React, { useContext } from 'react'
import { SecondaryTitle } from '../Title'
import { Grid } from '@material-ui/core'
import Reward from './Reward'
import { GlobalContext } from '../../context/Context'

const Rewards = () => {
  const {
    state
  } = useContext(GlobalContext)

  const { small, medium, large } = state.rewards

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
