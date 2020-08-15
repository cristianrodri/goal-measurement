import React, { useContext } from 'react'
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Avatar
} from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'
import logo from '../assets/favicon.png'
import { Link, useHistory } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { GlobalContext } from '../context/Context'

const useStyles = makeStyles(theme => ({
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
    marginLeft: theme.gutter,
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
  const [, , removeCookie] = useCookies()
  const { state, isAuthenticated, dispatchLogout } = useContext(GlobalContext)

  const logoutAction = () => {
    removeCookie('token')
    removeCookie('user')
    dispatchLogout()
    history.push('/')
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
          {!isAuthenticated() && (
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

          {isAuthenticated() && (
            <PopupState variant="popover" popupId="demo-popup-menu">
              {popupState => (
                <React.Fragment>
                  <IconButton
                    style={{ padding: '0' }}
                    className={classes.links}
                    {...bindTrigger(popupState)}
                  >
                    {!state.avatar ? (
                      <PersonIcon />
                    ) : (
                      <Avatar alt="User avatar" src={state.avatar} />
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
                </React.Fragment>
              )}
            </PopupState>
          )}
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Header
