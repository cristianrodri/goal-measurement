const createUser = (data: FormData) => {
  return fetch('/api/user/signup', {
    method: 'POST',
    body: data
  })
    .then(res => {
      return res.json()
    })
    .catch(err => console.log(err))
}

const resendLinkAPI = ({ email }: { email: string }) => {
  return fetch('/api/user/resend-link', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({ email })
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}

const loginUser = ({
  email,
  password
}: {
  email: string
  password: string
}) => {
  return fetch('/api/user/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
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

const updateUser = (data: FormData) => {
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

const deleteUser = ({ password }: { password: string }) => {
  return fetch('/api/user/me', {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password })
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}

const updatePassword = ({
  password,
  newPassword
}: {
  password: string
  newPassword: string
}) => {
  return fetch('/api/user/update-password', {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, newPassword })
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}

const userAvatar = (id: string) => {
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
