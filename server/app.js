const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')
const morgan = require('morgan')
const connectDB = require('./db/db')
const userRoutes = require('./routes/user.routes')
const goalRoutes = require('./routes/goal.routes')
const performanceRoutes = require('./routes/performance.routes')
const { userAvatar } = require('./controllers/user.controller')

const app = express()

// Connect to the database
connectDB()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

if (process.env.NODE_ENV === 'development') morgan('dev')

app.use('/api/user', userRoutes)
app.get('/api/user/:id/avatar', userAvatar)
app.use('/api', goalRoutes)
app.use('/api', performanceRoutes)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '../client/build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build/index.html'))
  })
}

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: err.inner.message })
  }
})

module.exports = app
