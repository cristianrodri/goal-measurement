import { makeStyles, Button, Theme, ButtonProps } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
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
    color: theme.palette.error.main
  }
}))

export const PrimaryButton: React.FC<ButtonProps> = ({
  children,
  ...props
}) => (
  <Button
    color="primary"
    variant="contained"
    {...props}
    className={useStyles().button}
  >
    {children}
  </Button>
)

export const SelectionButton: React.FC<ButtonProps> = ({
  children,
  ...props
}) => (
  <Button
    size="small"
    color="primary"
    variant="outlined"
    {...props}
    className={useStyles().button}
  >
    {children}
  </Button>
)
export const DeleteButton: React.FC<ButtonProps> = ({ children, ...props }) => (
  <Button className={useStyles().deleteAccount} {...props}>
    {children}
  </Button>
)
