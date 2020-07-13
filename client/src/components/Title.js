import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'

const Title = ({children, align, ...props}) => (
  <Typography align={align} gutterBottom {...props}>
    {children}
  </Typography>
)

Title.propTypes = {
  align: PropTypes.string
}

Title.defaultProps = {
  align: 'center'
}

const withTitle = Component => props => <Component {...props} />

const CustomTitle = withTitle(Title)

export const MainTitle = props => (
  <CustomTitle component="h1" variant="h5" {...props}>
    {props.children}
  </CustomTitle>
)

export const SecondaryTitle = props => (
  <CustomTitle component="h2" variant="h6" {...props}>
    {props.children}
  </CustomTitle>
)

export const ThirdTitle = props => (
  <CustomTitle component="h3" variant="body1" {...props}>
    {props.children}
  </CustomTitle>
)
