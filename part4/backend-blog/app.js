const express = require('express')
const cors = require('cors')
const app = express()
const blogRouters = require('./controllers/blogController')
const userRouters = require('./controllers/userController')
const loginRouters = require('./controllers/login')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
app.use(cors())
app.use(express.json())

app.use(middleware.tokenExtractor)
app.use('/api/blogs', blogRouters)
app.use('/api/users', userRouters)
app.use('/api/login', loginRouters)

app.use(middleware.handleError)
app.use(middleware.unknownEndpoint)


module.exports = app