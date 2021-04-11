import { useSelector } from 'react-redux'
import { SecondaryTitle } from '../Title'
import { Grid } from '@material-ui/core'
import Reward from './Reward'
import { RootState } from '../../redux'
import { Rewards } from '../../types'

const RewardsComponent = () => {
  const { small, medium, large } = useSelector(
    (state: RootState) => state.goalForm.rewards
  ) as Rewards

  return (
    <div>
      <SecondaryTitle>Define your rewards</SecondaryTitle>
      <Grid container spacing={3} justify="center">
        <Reward type="small" rewards={small} />
        <Reward type="medium" rewards={medium} />
        <Reward type="large" rewards={large} />
      </Grid>
    </div>
  )
}

export default RewardsComponent
