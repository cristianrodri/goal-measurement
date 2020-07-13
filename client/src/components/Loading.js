import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles, useTheme } from '@material-ui/core'
import ReactLoading from 'react-loading'

const useStyles = makeStyles(theme => ({
  loadingContainer: {
    position: 'fixed',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  withClosestParent: {
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center'
  }
}))

// when use styledByParent, the loading component will be mount into a element which is waiting for a API data. Instead if you use styledByParent in false or not calling it, the loading component will be mount in the center of the viewport
const Loading = ({ styledByParent }) => {
  const classes = useStyles()
  const theme = useTheme()

  return (
    <div className={ styledByParent ? classes.withClosestParent : classes.loadingContainer }>
      <ReactLoading
        type="spin"
        color={theme.palette.primary.main}
        width={32}
        height={32}
      />
    </div>
  )
}

Loading.propTypes = {
  styledByParent: PropTypes.bool
}

Loading.defaultProps = {
  styledByParent: false
}

export default Loading
