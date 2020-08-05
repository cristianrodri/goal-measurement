import React, { useContext } from 'react'
import { Typography } from '@material-ui/core'
import { MainTitle } from './../Title'
import { GlobalContext } from '../../context/Context'
import moment from 'moment'
import { textCapitalize } from './../../utils/text'

const Title = () => {
  const { state } = useContext(GlobalContext)
  return (
    <>
      <MainTitle>{textCapitalize(state.shortDescription)}</MainTitle>
      <Typography align="center" variant="body1" gutterBottom>
        {moment(state.endDate).format('LL')} ({moment(state.endDate).from()})
      </Typography>
    </>
  )
}

export default Title
