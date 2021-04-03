import { GoalFormDB } from '../types'

const getGoalsByUser = (clientUTC: number) => {
  return fetch(`/api/goals/${clientUTC}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}

const createGoal = (data: GoalFormDB, clientUTC: number) => {
  return fetch(`/api/goal/create/${clientUTC}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}

const getGoalById = (goalId: string) => {
  return fetch(`/api/goal/${goalId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}

type GoalData = {
  [Property in keyof GoalFormDB]?: GoalFormDB[Property]
}

const updateGoal = (data: GoalData, id: string, clientUTC: number) => {
  return fetch(`/api/goal/${id}/${clientUTC}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}

const deleteGoal = (goalId: string) => {
  return fetch(`/api/goal/${goalId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}

export { getGoalsByUser, createGoal, getGoalById, updateGoal, deleteGoal }
