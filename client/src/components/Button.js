import React from 'react'
import { makeStyles, Button } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  button: {
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    alignItems: 'center'
  }
}))

export const PrimaryButton = ({ children, ...props }) => (
  <Button color="primary" variant="contained" {...props} className={useStyles().button}>
    {children}
  </Button>
)

export const SelectionButton = ({ children, ...props }) => (
  <Button size="small" color="primary" variant="outlined" {...props}>
    {children}
  </Button>
)
