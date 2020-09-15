import React from 'react';
import { makeStyles, Button } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  button: {
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    alignItems: 'center'
  },
  deleteAccount: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: theme.spacing(2),
    color: theme.palette.error[400]
  }
}));
export const PrimaryButton = ({
  children,
  ...props
}) => <Button color="primary" variant="contained" {...props} className={useStyles().button}>
    {children}
  </Button>;
export const SelectionButton = ({
  children,
  ...props
}) => <Button size="small" color="primary" variant="outlined" {...props} className={useStyles().button}>
    {children}
  </Button>;
export const DeleteButton = ({
  children,
  ...props
}) => <Button className={useStyles().deleteAccount} {...props}>
    {children}
  </Button>;