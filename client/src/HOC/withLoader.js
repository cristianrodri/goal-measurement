import React from 'react'
import Loading from './../components/Loading'

export const withLoader = Component => ({ isLoading, ...props }) =>
  isLoading ? <Loading /> : <Component {...props} />
