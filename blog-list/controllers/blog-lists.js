const blogListsRouter = require('express').Router()
const Blog = require('../models/blog-list.js')
const User = require('../models/user.js')
const jwt = require('jsonwebtoken')
const { badRequest } = require('../utils/middleware.js')
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

blogListsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogListsRouter.post('/', async (request, response) => {
  const user = request.user
  if (!user) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const blogToCreate = {...request.body, user: user._id}
  const blog = new Blog(blogToCreate )

  const savedBlog = await blog.save()

  user.blogs.push(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)  
})

blogListsRouter.delete('/:id', async (request, response) => {  
  const user = request.user
  if (!user._id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const blog = await Blog.findById(request.params.id)
  if (user._id.toString() !== blog.user.toString()) {
    return response.status(403).json({ error: 'invalid user' })
  }
  const result = await Blog.findByIdAndDelete(request.params.id)
  response.status(204).send()
})

blogListsRouter.patch('/:id', async (request, response) => {
  const blog = {
    likes: request.body.likes,
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.status(200).json(updatedBlog)
})

  module.exports = blogListsRouter
