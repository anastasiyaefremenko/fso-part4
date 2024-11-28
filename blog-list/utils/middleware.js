const jwt = require('jsonwebtoken')
const User = require('../models/user.js')

const errorHandler = (error, req, response, next) => {
  if (error.name === "ValidationError") {
    response.status(400).send(error.message);
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({ error: 'expected `username` to be unique' })
  } else if (error.name ===  'JsonWebTokenError') {
    return response.status(401).json({ error: 'token invalid' })
  }

    next(error)
}
const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    const token = authorization.replace('Bearer ', '')
    request.token = token;
  }
  next()
}
const userExtractor = (async (request, response, next) => {
  if (request.token) {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    const user = await User.findById(decodedToken.id)
    request.user = user
  }
  
  next()
})

module.exports = {
    errorHandler, tokenExtractor, userExtractor
  }