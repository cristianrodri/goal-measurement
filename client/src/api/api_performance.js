const createPerformanceAPI = (token, goalId, data) => {
  return fetch(`/api/v1/${goalId}/performance/create`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .catch(error => console.log(error))
}

const getAllPerformancesByGoal = (token, goalId) => {
  return fetch(`/api/v1/${goalId}/performances`, {
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

const getTodayPerformance = (token, goalId) => {
  return fetch(`/api/v1/${goalId}/performance`, {
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

const updatePerformance = (token, goalId, performanceId, data) => {
  return fetch(`/api/v1/${goalId}/performance/${performanceId}`, {
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

export {
  createPerformanceAPI,
  getTodayPerformance,
  getAllPerformancesByGoal,
  updatePerformance
}
