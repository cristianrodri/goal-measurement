import { Paper, makeStyles, Typography, Button, Theme } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    height: '100%',
    margin: 'auto',
    backgroundColor: 'inherit'
  },
  title: {
    fontWeight: 700,
    fontSize: '10rem',
    background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    fallback: {
      background: theme.palette.primary.main
    },
    backgroundClip: 'text',
    '-webkit-background-clip': 'text',
    color: 'transparent'
  },
  subtitle: {
    fontSize: '1.5rem'
  },
  link: {
    display: 'flex',
    justifyContent: 'center'
  }
}))

const NotFound = () => {
  const classes = useStyles()
  useDocumentTitle('Not Found')

  return (
    <Paper className={classes.card} elevation={0}>
      <Typography
        variant="h1"
        component="h1"
        className={classes.title}
        align="center"
      >
        404
      </Typography>
      <Typography
        variant="h5"
        component="h2"
        className={classes.subtitle}
        align="center"
        gutterBottom
      >
        Oops! This Page Could Not Be Found
      </Typography>
      <Link to="/" className={classes.link}>
        <Button variant="contained" color="primary">
          Go to homepage
        </Button>
      </Link>
    </Paper>
  )
}

export default NotFound
