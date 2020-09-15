import React from 'react'
import { Typography } from '@material-ui/core'
import { MainTitle } from './../Title'
import moment from 'moment'
import { textCapitalize } from './../../utils/text'
import { useSelector } from 'react-redux'

const Title = () => {
  const state = useSelector(state => state.goal.selectedGoal)
  return (
    <>
      <MainTitle>{textCapitalize(state.shortDescription)}</MainTitle>
      <Typography align="center" variant="body1" gutterBottom>
        {moment(state.end).format('LL')} ({moment(state.end).from()})
      </Typography>
    </>
  )
}

export default Title
