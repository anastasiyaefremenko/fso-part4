const Blog = require('../models/blog-list.js')
const User = require('../models/user.js')
const jwt = require('jsonwebtoken')

const TEST_USER_ID = "67449b723988d1d67a01c481";

const initialBlogs = [
    {
    title: "My blog", 
    author: "John Doe", 
    url:"www.johndoe.com", 
    user: TEST_USER_ID,
    likes: "6",
    },
    {
      title: "My other blog", 
      author: "John Doe", 
      url:"www.johndoe.com", 
      user: TEST_USER_ID,
      likes: "2"
      },
  ]

const initialUsers = [
    {
        _id: TEST_USER_ID,
        username: "star",
        name: "Super Star",
        password: "star"
    }
  ]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}
const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

const getTestToken = async (userId) => {
  const user = await User.findById(userId)

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  return jwt.sign(userForToken, process.env.SECRET)
}

  module.exports = { initialBlogs, initialUsers, blogsInDb, usersInDb, getTestToken, TEST_USER_ID}