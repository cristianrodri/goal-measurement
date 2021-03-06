import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Theme
} from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'
import logo from '../assets/favicon.png'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  emptyForm,
  isAuthenticated,
  logout,
  resetGoals,
  resetPerformance,
  RootState
} from '../redux'
import { logoutUser } from './../api/api_user'

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between'
  },
  containerLink: {
    display: 'flex',
    alignCenter: 'center',
    height: '3.5rem'
  },
  links: {
    color: theme.palette.secondary.main,
    marginLeft: '1rem',
    '&:hover': {
      color: theme.palette.secondary.dark
    }
  },
  menuLinks: {
    display: 'flex'
  },
  button: {
    padding: '0'
  }
}))

const Header = () => {
  const classes = useStyles()
  const history = useHistory()
  const avatar = useSelector((state: RootState) => state.user.avatar)
  const dispatch = useDispatch()
  const isAuth = useSelector((state: RootState) => state.user.isAuth)

  const logoutAction = async () => {
    try {
      const res = await logoutUser()

      if (res.success) {
        dispatch(isAuthenticated(false))

        history.push('/')

        dispatch(logout())
        dispatch(resetGoals())
        dispatch(resetPerformance())
        dispatch(emptyForm())
      }
    } catch (error) {}
  }

  return (
    <AppBar position="sticky">
      <Toolbar className={classes.header}>
        <Typography>
          <Link to="/" className={classes.containerLink}>
            <img src={logo} alt="Goal Measurement" />
          </Link>
        </Typography>
        <div className={classes.menuLinks}>
          {!isAuth && (
            <>
              <Button color="secondary" className={classes.links}>
                <Link to="/signup" style={{ color: 'inherit' }}>
                  Sign up
                </Link>
              </Button>
              <Button color="secondary" className={classes.links}>
                <Link to="/login" style={{ color: 'inherit' }}>
                  Login
                </Link>
              </Button>
            </>
          )}

          {isAuth && (
            <PopupState variant="popover" popupId="demo-popup-menu">
              {popupState => (
                <>
                  <IconButton
                    style={{ padding: '0' }}
                    className={classes.links}
                    {...bindTrigger(popupState)}
                  >
                    {!avatar ? (
                      <PersonIcon />
                    ) : (
                      <Avatar alt="User avatar" src={avatar} />
                    )}
                  </IconButton>
                  <Menu {...bindMenu(popupState)} onClick={popupState.close}>
                    <MenuItem onClick={() => history.push('/edit-user')}>
                      Edit User
                    </MenuItem>
                    <MenuItem onClick={() => history.push('/privacy')}>
                      Privacy
                    </MenuItem>
                    <MenuItem onClick={logoutAction}>Logout</MenuItem>
                  </Menu>
                </>
              )}
            </PopupState>
          )}
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Header
