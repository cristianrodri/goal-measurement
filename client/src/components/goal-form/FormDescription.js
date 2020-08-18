import React, { useContext } from 'react'
import { GlobalContext } from '../../context/Context'
import { TextField } from '@material-ui/core'

const FormDescription = props => (
  <TextField variant="filled" required fullWidth {...props} />
)

const withFormDescription = Component => props => <Component {...props} />

const ShortDescription = withFormDescription(FormDescription)
const BigDescription = withFormDescription(FormDescription)

export const FormShortDescription = () => {
  const { state, dispatchShortDescription } = useContext(GlobalContext)
  return (
    <ShortDescription
      label="What is your goal"
      inputProps={{ maxLength: 50 }}
      value={state.shortDescription}
      onChange={e => dispatchShortDescription(e.target.value)}
    />
  )
}

export const FormBigDescription = () => {
  const { state, dispatchBigDescription } = useContext(GlobalContext)
  return (
    <BigDescription
      label="Specific goal (what do you really want to achieve)"
      multiline
      rowsMax={5}
      margin="normal"
      value={state.bigDescription}
      onChange={e => dispatchBigDescription(e.target.value)}
    />
  )
}

export const ActivityInput = () => {
  const { state, dispatchActivityName } = useContext(GlobalContext)
  return (
    <TextField
      label="Activity"
      inputProps={{ maxLength: 50 }}
      variant="outlined"
      value={state.activityName}
      onChange={e => dispatchActivityName(e.target.value)}
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
