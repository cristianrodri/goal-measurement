import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { TextField } from '@material-ui/core'
import { setShortDescription, setBigDescription } from '../../redux'

const FormDescription = props => (
  <TextField variant="filled" required fullWidth {...props} />
)

const withFormDescription = Component => props => <Component {...props} />

const ShortDescription = withFormDescription(FormDescription)
const BigDescription = withFormDescription(FormDescription)

export const FormShortDescription = () => {
  const shortDescription = useSelector(state => state.goalForm.shortDescription)
  const dispatch = useDispatch()
  return (
    <ShortDescription
      label="What is your goal"
      inputProps={{ maxLength: 50 }}
      value={shortDescription}
      onChange={e => dispatch(setShortDescription(e.target.value))}
    />
  )
}

export const FormBigDescription = () => {
  const bigDescription = useSelector(state => state.goalForm.bigDescription)
  const dispatch = useDispatch()
  return (
    <BigDescription
      label="Specific goal (what do you really want to achieve)"
      multiline
      rowsMax={5}
      margin="normal"
      value={bigDescription}
      onChange={e => dispatch(setBigDescription(e.target.value))}
    />
  )
}

export const RewardsInput = props => (
  <TextField
    variant="filled"
    fullWidth={false}
    inputProps={{ maxLength: 50 }}
    {...props}
  />
)
