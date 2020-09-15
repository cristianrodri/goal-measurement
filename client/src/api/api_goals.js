const getGoalsByUser = token => {
  return fetch('/api/goals', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}

const createGoal = (data, token) => {
  return fetch('/api/goal/create', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}

const getGoalById = (token, goalId) => {
  return fetch(`/api/goal/${goalId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}

const updateGoal = (data, token, currentDay) => {
  return fetch(`/api/goal/${data._id}/${currentDay}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}

const deleteGoal = (token, goalId) => {
  return fetch(`/api/goal/${goalId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}

export { getGoalsByUser, createGoal, getGoalById, updateGoal, deleteGoal }
