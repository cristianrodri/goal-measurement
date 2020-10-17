const createUser = data => {
  return fetch('/api/user/signup', {
    method: 'POST',
    body: data
  })
    .then(res => {
      return res.json()
    })
    .catch(err => console.log(err))
}

const resendLinkAPI = data => {
  return fetch('/api/user/resend-link', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}

const loginUser = data => {
  return fetch('/api/user/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    // credentials: 'include',
    body: JSON.stringify(data)
  })
    .then(res => {
      return res.json()
    })
    .catch(err => console.log(err))
}

const getTokenApi = () => {
  return fetch('/api/user/token')
    .then(res => res.json())
    .catch(err => console.log(err))
}

const logoutUser = () => {
  return fetch('/api/user/logout', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}

const getUserById = () => {
  return fetch('/api/user/me', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}

const updateUser = data => {
  return fetch('/api/user/me', {
    method: 'PUT',
    headers: {
      Accept: 'application/json'
    },
    body: data
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}

const deleteUser = (token, data) => {
  return fetch('/api/user/me', {
    method: 'DELETE',
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

const updatePassword = data => {
  return fetch('/api/user/update-password', {
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

const userAvatar = id => {
  return fetch(`/api/user/${id}/avatar`)
}

export {
  createUser,
  resendLinkAPI,
  loginUser,
  getTokenApi,
  logoutUser,
  getUserById,
  updateUser,
  deleteUser,
  userAvatar,
  updatePassword
}
