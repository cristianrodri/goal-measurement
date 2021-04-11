import { ChangeEvent, FormEvent } from 'react'
import {
  makeStyles,
  TextField,
  IconButton,
  Typography,
  Button,
  Card,
  CardContent,
  Divider,
  Theme,
  TextFieldProps
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles((theme: Theme) => ({
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

export const FormContainer: React.FC = ({ children }) => (
  <Card className={useStyles().card}>{children}</Card>
)

export const FormContent: React.FC<{
  handleSubmit: (e: FormEvent) => Promise<void>
}> = ({ children, handleSubmit }) => (
  <CardContent className={useStyles().cardContent}>
    <form onSubmit={handleSubmit}>{children}</form>
  </CardContent>
)

export const FormUsername = (props: TextFieldProps) => (
  <TextField
    label="Username"
    variant="outlined"
    fullWidth
    required
    className={useStyles().textField}
    {...props}
  />
)

export const FormEmail = (props: TextFieldProps) => (
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

export const FormPassword = (props: TextFieldProps) => (
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

interface AvatarProps {
  imageName: string
  uploadImage: (e: ChangeEvent<HTMLInputElement>) => void
  deleteImage: () => void
}

export const FormAvatar = ({
  imageName,
  deleteImage,
  uploadImage
}: AvatarProps) => {
  const classes = useStyles()
  return (
    <div>
      {!imageName && (
        <>
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
        </>
      )}
      {imageName && (
        <Typography className={classes.imgName}>
          {imageName}
          <IconButton
            key="close"
            size="small"
            aria-label="close"
            color="inherit"
            onClick={deleteImage}
          >
            <CloseIcon />
          </IconButton>
        </Typography>
      )}
    </div>
  )
}
