import React from 'react'
import {
  LinearProgress,
  Box,
  Typography,
  LinearProgressProps
} from '@material-ui/core'

interface Props {
  value: number
}

const Progress = ({ value }: Props) => (
  <Box display="flex" alignItems="center">
    <Box width="100%" mr={1}>
      <LinearProgress variant="determinate" color="secondary" value={value} />
    </Box>
    <Box minWidth={35}>
      <Typography variant="body1" color="textSecondary">{`${Math.round(
        value
      )}%`}</Typography>
    </Box>
  </Box>
)

export default Progress
