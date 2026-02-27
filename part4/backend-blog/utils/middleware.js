const logger = require('./logger')
const UserModel = require('../models/user')
const jwt = require('jsonwebtoken')

const requestDetails = (request, response, next) => {
    logger.info('*'.repeat(50))
    logger.info('HEAD ', request.method)
    logger.path('PATH ', request.path)
    logger.info('BODY ', request.body)
    logger.info('-'.repeat(50))
    next()
}

const unknownEndpoint = (request, response, next) => {
    response.status(404).send({ error: "Unknown endpoint" });
}

const handleError = (error, request, response, next) => {
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
    else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
        return response.status(400).json({ error: 'expected `username` to be unique' })
    }
    else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({ error: 'Invalid token' })
    }
    else if (error.name === 'TokenExpiredError') {
        return response.status(401).json({ error: 'Token expired' })
    }
    next(error)
}

const tokenExtractor = (request, response, next) => {
    const auth = request.get('authorization')
    if (auth && auth.startsWith('Bearer ')) {
        request.token = auth.replace('Bearer ', '')
    }
    next()
}

const userExtractor = async (request, response, next) => {
  try {
    const token = request.token
    if (!token) return response.status(401).json({ error: 'token missing' })

    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) return response.status(401).json({ error: 'token invalid' })

    const user = await UserModel.findById(decodedToken.id)
    if (!user) return response.status(401).json({ error: 'user not found' })

    request.user = user
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = {
    requestDetails,
    unknownEndpoint,
    handleError,
    tokenExtractor,
    userExtractor
}