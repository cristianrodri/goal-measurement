import { Typography } from '@material-ui/core'
import { MainTitle } from './../Title'
import moment from 'moment'
import { textCapitalize } from './../../utils/text'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux'
import { Goal } from '../../types'

const Title = () => {
  const { shortDescription, end } = useSelector(
    (state: RootState) => state.goal.selectedGoal
  ) as Goal

  return (
    <>
      <MainTitle>{textCapitalize(shortDescription)}</MainTitle>
      <Typography align="center" variant="body1" gutterBottom>
        {moment(end).format('LL')} ({moment(end).from(moment().format())})
      </Typography>
    </>
  )
}

export default Title
