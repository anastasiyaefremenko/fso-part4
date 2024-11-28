const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const Blog = require('../models/blog-list.js')
const User = require('../models/user.js')
const helper = require('./test_helper.js')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany()

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
  await User.deleteMany()

  for (let user of helper.initialUsers) {
    let userObject = new User(user)
    await userObject.save()
  }
})

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, 2)
})

test('the unique identifier property is named id', async () => {
  const response = await api.get('/api/blogs')

  assert(response.body[0].id)
  assert.strictEqual(response.body[0]._id, undefined)
})

test('creates a new blog', async () => {
  const newBlog = {
    title: "The Brothers Karamazov", 
    author: "Fyodor Dostoevsky", 
    url:"www.dostoevsky.com", 
    likes: "3"
  }
  const response = await api
    .post('/api/blogs')
    .set({"authorization": `Bearer ${await helper.getTestToken(helper.TEST_USER_ID)}`})
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogs = await helper.blogsInDb()

  assert.strictEqual(blogs.length, helper.initialBlogs.length + 1, )
  assert(blogs.find(blog => newBlog.title === blog.title))
  assert(response.body.user)
})
test('if the likes property is missing from the request, it will default to the value 0', async () => {
  const newBlog = {
    title: "War and Peace", 
    author: "Leo Tolstoy", 
    url:"www.tolstoy.com"
  }
  await api
    .post('/api/blogs')
    .set({"authorization": `Bearer ${await helper.getTestToken(helper.TEST_USER_ID)}`})
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDb()
    assert(blogs.find(blog => blog.title === blog.title && blog.likes === 0))
})
test('if the title or url properties are missing, the backend responds to the request with the status code 400 Bad Request', async () => {
  const missingTitle = { 
    author: "Charles Bukowski", 
    url:"www.bukowski.com"
  }
  const missingUrl = {
    title: "Women", 
    author: "Charles Bukowski"
  }
  await api
  .post('/api/blogs')
  .set({"authorization": `Bearer ${await helper.getTestToken(helper.TEST_USER_ID)}`})
  .send(missingTitle)
  .expect(400)

  await api
  .post('/api/blogs')
  .set({"authorization": `Bearer ${await helper.getTestToken(helper.TEST_USER_ID)}`})
  .send(missingUrl)
  .expect(400)
})
test('adding a blog fails with the proper status code 401 Unauthorized if a token is not provided', async () => {
  const newBlog = {
    title: "The Brothers Karamazov", 
    author: "Fyodor Dostoevsky", 
    url:"www.dostoevsky.com", 
    likes: "3"
  }
  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
})
test('delete a blog', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api.delete(`/api/blogs/${blogToDelete.id}`).set({"authorization": `Bearer ${await helper.getTestToken(helper.TEST_USER_ID)}`}).expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
})
test('update a blog', async () => {
  const payload = {likes: 23}
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  const response = await api.patch(`/api/blogs/${blogToUpdate.id}`).set({"authorization": `Bearer ${await helper.getTestToken(helper.TEST_USER_ID)}`}).send(payload).expect(200)
  assert.strictEqual(response.body.title, blogToUpdate.title)
  assert.strictEqual(response.body.likes, payload.likes)
})
test('invalid users are not created', async () => {
  const usersAtStart = await helper.usersInDb()
  const userOne = {
    "username": "sh",
    "name": "Short username",
    "password": "12345"
  }
  const userTwo = {
    "username": "short",
    "name": "Short password",
    "password": "12"
  }
  await api
  .post('/api/users')
  .send(userOne)
  .expect(400)

  await api
  .post('/api/users')
  .send(userTwo)
  .expect(400)

  const usersAtEnd = await helper.usersInDb()
  assert.strictEqual(usersAtStart.length, usersAtEnd.length)
})
after(async () => {
  await mongoose.connection.close()
})