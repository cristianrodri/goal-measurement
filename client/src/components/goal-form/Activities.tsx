import { FormControl } from '@material-ui/core'
import FormActivity from './FormActivity'
import GridActivities from './GridActivities'

const Activities = () => {
  return (
    <FormControl>
      <FormActivity />
      <GridActivities />
    </FormControl>
  )
}

export default Activities
