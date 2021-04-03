import React, { ComponentType } from 'react'
import Loading from './../components/Loading'

interface Props {
  isLoading: boolean
}

export const withLoader = (Component: ComponentType) => ({
  isLoading,
  ...props
}: Props) => (isLoading ? <Loading /> : <Component {...props} />)
