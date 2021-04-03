import React, { MouseEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  makeStyles,
  FormControl,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Theme
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'
import DoneIcon from '@material-ui/icons/Done'
import { RewardsInput } from './FormDescription'
import { PrimaryButton } from '../Button'
import { setReward, deleteReward } from '../../redux'
import { Rewards } from '../../types'
import { textCapitalize } from '../../utils/text'

const useStyles = makeStyles((theme: Theme) => ({
  formControl: {
    display: 'grid',
    gridGap: theme.spacing(2)
  },
  title: {
    textTransform: 'capitalize'
  },
  icon: {
    color: theme.palette.success.dark
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

interface Props {
  type: keyof Rewards
  rewards: string[]
}

const Reward = ({ rewards, type }: Props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [rewardValue, setRewardValue] = useState('')

  const handleRewards = () => {
    dispatch(setReward(type, rewardValue))
    setRewardValue('')
  }

  const handleDeleteReward = (value: string) => (
    e: MouseEvent<HTMLButtonElement>
  ) => {
    const button = e.currentTarget.closest('[aria-label="delete"]')
    if (!button) return

    // delete reward from rewards reducer
    dispatch(deleteReward(type, value))
  }

  return (
    <Grid item>
      <FormControl className={classes.formControl}>
        <RewardsInput
          label={`${textCapitalize(type)} rewards`}
          onChange={e => setRewardValue(e.target.value)}
          value={rewardValue}
        />
        <PrimaryButton
          onClick={handleRewards}
          disabled={type === 'large' && !!rewards.length}
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
              onClick={handleDeleteReward(reward)}
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

export default Reward
