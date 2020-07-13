const express = require('express')
require('colors')

require('dotenv').config({ path: './config/dev.env' })

const app = require('./server/app')

const server = express()
const port = app.get('PORT') || 3001

server.use(app)

server.listen(port, () => console.log(`Server running on port ${port}`.yellow.bold))