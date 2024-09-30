const config = require('./utils/config.js')
const express = require('express')
const app = express()
const cors = require('cors')
const blogListsRouter = require('./controllers/blog-lists.js')
const logger = require('./utils/logger.js')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogListsRouter)

module.exports = app