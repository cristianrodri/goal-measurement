const express = require('express')
require('colors')

if (process.env.NODE_ENV !== 'production')
  require('dotenv').config({ path: './config/dev.env' })

const app = require('./server/app')

const server = express()
const port = process.env.PORT || 3001

server.use(app)

server.listen(port, () =>
  console.log(`Server running on port ${port}`.green.bold)
)
