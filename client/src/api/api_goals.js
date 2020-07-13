const getGoals = token => {
  return fetch('/api/v1/goals', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  .then(res => res.json())
  .catch(err => console.log(err))
}

const createGoal = (data, token) => {
  return fetch('/api/v1/goal/create', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .catch(err => console.log(err))
}

const getGoalById = (token, goalId) => {
  return fetch(`/api/v1/goal/${goalId}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  .then(res => res.json())
  .catch(err => console.log(err))
}

const updateGoal = (data, token, goalId) => {
  return fetch(`/api/v1/goal/${goalId}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .catch(err => console.log(err))
}

const deleteGoal = (token, goalId) => {
  return fetch(`/api/v1/goal/${goalId}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  .then(res => res.json())
  .catch(err => console.log(err))
}


export {
  getGoals,
  createGoal,
  getGoalById,
  updateGoal,
  deleteGoal
}