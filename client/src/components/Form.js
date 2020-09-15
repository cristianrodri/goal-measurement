import React from 'react'
import PropTypes from 'prop-types'
import {
  makeStyles,
  TextField,
  IconButton,
  Typography,
  Button,
  Card,
  CardContent,
  Divider
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: '20rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: theme.spacing(2)
  },
  cardContent: {
    padding: 0,
    '&:last-child': {
      paddingBottom: 0
    },
    '& + *': {
      // add a margin top to the next element after form content
      marginTop: theme.spacing(2)
    }
  },
  textField: {
    marginBottom: theme.spacing(2)
  },
  upload: {
    width: '100%',
    backgroundColor: '#d6d6d6'
  },
  imgName: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    marginBottom: theme.spacing(1)
  },
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

export const FormContainer = props => (
  <Card className={useStyles().card}>{props.children}</Card>
)

export const FormContent = props => (
  <CardContent className={useStyles().cardContent}>
    <form onSubmit={props.handleSubmit}>{props.children}</form>
  </CardContent>
)

export const FormUsername = props => (
  <TextField
    label="Username"
    variant="outlined"
    fullWidth
    required
    className={useStyles().textField}
    {...props}
  />
)

export const FormEmail = props => (
  <TextField
    label="Email"
    variant="outlined"
    type="email"
    fullWidth
    required
    className={useStyles().textField}
    {...props}
  />
)

export const FormPassword = props => (
  <TextField
    variant="outlined"
    type="password"
    fullWidth
    required
    className={useStyles().textField}
    {...props}
  />
)

export const FormDivider = () => <Divider className={useStyles().divider} />

export const FormAvatar = ({ imageName, setImageName, uploadImage }) => {
  const classes = useStyles()
  return (
    <div>
      <input
        accept="image/*"
        id="raised-button-file"
        type="file"
        style={{ display: 'none' }}
        onChange={uploadImage}
      />
      <label htmlFor="raised-button-file" className={classes.textField}>
        <Button
          component="span"
          className={`${classes.textField} ${classes.upload}`}
        >
          Upload an avatar
        </Button>
      </label>
      {imageName && (
        <Typography className={classes.imgName}>
          {imageName}
          <IconButton
            key="close"
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => {
              setImageName('')
            }}
          >
            <CloseIcon />
          </IconButton>
        </Typography>
      )}
    </div>
  )
}

FormAvatar.propTypes = {
  imageName: PropTypes.string.isRequired,
  setImageName: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired
}
