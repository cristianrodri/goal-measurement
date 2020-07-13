import React from 'react'
import { LinearProgress, Box, Typography, withStyles } from '@material-ui/core'

const Progress = props => (
  <Box display="flex" alignItems="center">
    <Box width="100%" mr={1}>
      <LinearProgress variant="determinate" color="secondary" {...props} />
    </Box>
    <Box minWidth={35}>
      <Typography variant="body1" color="textSecondary">{`${Math.round(
        props.value
      )}%`}</Typography>
    </Box>
  </Box>
)

export default Progress
