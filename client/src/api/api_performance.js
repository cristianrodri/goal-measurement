export const createNewDayPerformance = (token, goalId, data) => {
  return fetch(`/api/${goalId}/createnewday`, {
    method: 'PUT',
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

export const getAllPerformancesByGoal = (token, goalId) => {
  return fetch(`/api/${goalId}/performances`, {
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

// const getTodayPerformance = (token, goalId) => {
//   return fetch(`/api/${goalId}/performance`, {
//     method: 'GET',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`
//     }
//   })
//     .then(res => res.json())
//     .catch(err => console.log(err))
// }

export const updatePerformanceDay = (token, goalId, performanceId, data) => {
  return fetch(`/api/${goalId}/updatePerformanceDay/${performanceId}`, {
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

// export { getTodayPerformance }
