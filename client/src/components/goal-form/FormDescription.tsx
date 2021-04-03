import React, { ComponentType } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { TextField, TextFieldProps } from '@material-ui/core'
import { setShortDescription, setBigDescription, RootState } from '../../redux'

const FormDescription = (props: TextFieldProps) => (
  <TextField variant="filled" required fullWidth {...props} />
)

const withFormDescription = (Component: ComponentType<TextFieldProps>) => (
  props: TextFieldProps
) => <Component {...props} />

const ShortDescription = withFormDescription(FormDescription)
const BigDescription = withFormDescription(FormDescription)

export const FormShortDescription = () => {
  const shortDescription = useSelector(
    (state: RootState) => state.goalForm.shortDescription
  )
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
  const bigDescription = useSelector(
    (state: RootState) => state.goalForm.bigDescription
  )
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

export const RewardsInput = (props: TextFieldProps) => (
  <TextField
    variant="filled"
    fullWidth={false}
    inputProps={{ maxLength: 50 }}
    {...props}
  />
)
