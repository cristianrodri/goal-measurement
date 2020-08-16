import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import {
  makeStyles,
  FormControl,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'
import DoneIcon from '@material-ui/icons/Done'
import { GlobalContext } from '../../context/Context'
import { RewardsInput } from './FormDescription'
import { PrimaryButton } from '../Button'

const useStyles = makeStyles(theme => ({
  formControl: {
    display: 'grid',
    gridGap: theme.spacing(2)
  },
  title: {
    textTransform: 'capitalize'
  },
  icon: {
    color: theme.palette.success['700']
  },
  listItem: {
    padding: '0',
    width: '12rem',
    maxWidth: '100%',
    '&:hover > *:last-child': {
      opacity: '1'
    }
  },
  iconButton: {
    opacity: '0',
    padding: '0.2em',
    transition: 'all .2s'
  }
}))

const Reward = ({ rewards, name }) => {
  const classes = useStyles()
  const { dispatchAddReward, dispatchDeleteReward } = useContext(GlobalContext)
  const [rewardValue, setRewardValue] = useState('')

  const handleRewards = () => {
    dispatchAddReward(name, rewardValue)
    setRewardValue('')
  }

  const deleteReward = e => {
    const button = e.target.closest('[aria-label="delete"]')
    if (!button) return

    const value = button.dataset.name

    // delete reward from rewards reducer
    dispatchDeleteReward(name, value)
  }

  return (
    <Grid item>
      <FormControl className={classes.formControl}>
        <RewardsInput
          label={`${name} rewards`}
          onChange={e => setRewardValue(e.target.value)}
          value={rewardValue}
        />
        <PrimaryButton
          onClick={handleRewards}
          disabled={name === 'Large' && rewards.length}
        >
          <AddIcon />
          Add Reward
        </PrimaryButton>
      </FormControl>
      <List>
        {rewards.map(reward => (
          <ListItem disableGutters key={reward} className={classes.listItem}>
            <ListItemIcon style={{ minWidth: '0', paddingRight: '1em' }}>
              <DoneIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText className={classes.title}>{reward}</ListItemText>
            <IconButton
              aria-label="delete"
              className={classes.iconButton}
              data-name={reward}
              onClick={deleteReward}
              title="Delete reward"
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Grid>
  )
}

Reward.propTypes = {
  rewards: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired
}

export default Reward
