const expressJwt = require('express-jwt')

// generate req.user in case of the token is valid
const auth = expressJwt({
  secret: process.env.JWT_KEY,
  algorithms: ['RS256']
})

module.exports = auth
