import { PerformanceActivity } from '../types'

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

export const updatePerformanceDay = (
  goalId: string,
  performanceId: string,
  data: { done: boolean; activities: PerformanceActivity[] }
) => {
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
