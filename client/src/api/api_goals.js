const getGoalsByUser = clientUTC => {
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

const createGoal = (data, currentDate) => {
  return fetch(`/api/goal/create/${currentDate}`, {
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

const getGoalById = goalId => {
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

const updateGoal = (data, id, currentDay) => {
  return fetch(`/api/goal/${id}/${currentDay}`, {
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

const deleteGoal = goalId => {
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
