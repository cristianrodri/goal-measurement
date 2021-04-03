export const createNewDayPerformance = (goalId, data) => {
  return fetch(`/api/${goalId}/createnewday`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .catch(error => console.log(error))
}

export const getAllPerformancesByGoal = (goalId: string, clientUTC: number) => {
  return fetch(`/api/${goalId}/performances/${clientUTC}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}

export const updatePerformanceDay = (goalId, performanceId, data) => {
  return fetch(`/api/${goalId}/updatePerformanceDay/${performanceId}`, {
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

// export { getTodayPerformance }
