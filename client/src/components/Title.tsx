import React, { ComponentType } from 'react'
// import PropTypes from 'prop-types'
import { Typography, TypographyProps } from '@material-ui/core'

const Title: React.FC<TypographyProps> = ({
  children,
  align = 'center',
  ...props
}) => (
  <Typography gutterBottom {...props} align={align}>
    {children}
  </Typography>
)

const withTitle = (Component: ComponentType<TypographyProps>) => (
  props: TypographyProps
) => <Component {...props} />

const CustomTitle = withTitle(Title)

export const MainTitle: React.FC<TypographyProps> = ({
  children,
  ...props
}) => (
  <CustomTitle variantMapping={{ h5: 'h1' }} variant="h5" {...props}>
    {children}
  </CustomTitle>
)

export const SecondaryTitle: React.FC<TypographyProps> = ({
  children,
  ...props
}) => (
  <CustomTitle variantMapping={{ h6: 'h2' }} variant="h6" {...props}>
    {children}
  </CustomTitle>
)

export const ThirdTitle: React.FC<TypographyProps> = ({
  children,
  ...props
}) => (
  <CustomTitle variantMapping={{ body1: 'h3' }} variant="body1" {...props}>
    {children}
  </CustomTitle>
)
