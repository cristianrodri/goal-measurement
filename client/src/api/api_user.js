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

const getUserById = token => {
  return fetch('/api/user/me', {
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

const updateUser = (token, data) => {
  return fetch('/api/user/me', {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
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

const updatePassword = (token, data) => {
  return fetch('/api/user/update-password', {
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

const userAvatar = id => {
  return fetch(`/api/user/${id}/avatar`)
}

// NOT USED YET
const logoutUser = () => {
  return fetch('/api/user/logout', {
    method: 'GET'
  })
}

export {
  createUser,
  resendLinkAPI,
  loginUser,
  logoutUser,
  getUserById,
  updateUser,
  deleteUser,
  userAvatar,
  updatePassword
}
