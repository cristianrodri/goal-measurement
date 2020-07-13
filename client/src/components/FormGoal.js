import React from 'react'
import { makeStyles, Divider } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  submit: {
    display: 'block',
    marginTop: theme.spacing(2),
    marginLeft: 'auto',
    marginRight: 'auto'
  }
}))

export const FormContainer = props => {
  return <div></div>
}

export const FormDivider = () => <Divider className={useStyles().divider} />
