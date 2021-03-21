import { green, grey, lime, red } from '@material-ui/core/colors'

const COMPLETED = 'COMPLETED'
const BETWEEN_80_AND_99 = '80-99'
const BETWEEN_50_AND_79 = '50-79'
const BETWEEN_20_AND_49 = '20-49'
const BETWEEN_1_AND_19 = '1-19'
const DID_NOTHING = '0'
const NOT_WORKING_DAY = 'NOT_WORKING_DAY'

const colors = {
  [COMPLETED]: green[700],
  [BETWEEN_80_AND_99]: green[600],
  [BETWEEN_50_AND_79]: green[400],
  [BETWEEN_20_AND_49]: lime[400],
  [BETWEEN_1_AND_19]: red[300],
  [DID_NOTHING]: red[600],
  [NOT_WORKING_DAY]: grey[300]
}

export const borderColors = {
  [COMPLETED]: green[400],
  [BETWEEN_80_AND_99]: green[300],
  [BETWEEN_50_AND_79]: green[200],
  [BETWEEN_20_AND_49]: lime[400],
  [BETWEEN_1_AND_19]: red[200],
  [DID_NOTHING]: red[300],
  [NOT_WORKING_DAY]: grey[200]
}

export const backgroundColors = Object.entries(colors).reduce(
  (prev, cur) => ({
    ...prev,
    [cur[0]]: {
      backgroundColor: cur[1]
    }
  }),
  {}
)

export const progressColor = (percentage, isWorkingDay) => {
  if (isWorkingDay) {
    switch (true) {
      case percentage === 100:
        return COMPLETED
      case percentage >= 80:
        return BETWEEN_80_AND_99
      case percentage >= 50:
        return BETWEEN_50_AND_79
      case percentage >= 20:
        return BETWEEN_20_AND_49
      case percentage >= 1:
        return BETWEEN_1_AND_19
      default:
        return DID_NOTHING
    }
  } else {
    return NOT_WORKING_DAY
  }
}
