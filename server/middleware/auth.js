const expressJwt = require('express-jwt')

// generate req.user object with a unique _id property in case of the token is valid
const auth = expressJwt({
  secret: process.env.JWT_KEY,
  algorithms: ['HS256']
})

module.exports = auth
