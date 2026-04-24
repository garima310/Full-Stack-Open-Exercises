const express = require('express')
const mongoose = require('mongoose')

const app = express()

const Blog = require('./models/blog')

const mongoUrl = 'mongodb+srv://garimaa298:Garima310@spirecluster0.y3nbbog.mongodb.net/?appName=SpireCluster0'
mongoose.connect(mongoUrl, { family: 4 })

app.use(express.json())

// GET
app.get('/api/blogs', (request, response) => {
  Blog.find({}).then(blogs => response.json(blogs))
})

// POST
app.post('/api/blogs', (request, response) => {
  const body = request.body

  if (!body.title || !body.url) {
    return response.status(400).json({ error: 'title or url missing' })
  }

  const blog = new Blog(body)

  blog.save().then(result => {
    response.status(201).json(result)
  })
})


app.delete('/api/blogs/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})


app.put('/api/blogs/:id', async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    request.body,
    { new: true }
  )

  response.json(updatedBlog)
})

// USERS
app.post('/api/users', (request, response) => {
  const { username, name, password } = request.body

  response.status(201).json({ username, name, password })
})

// LOGIN
app.post('/api/login', (request, response) => {
  const { username, password } = request.body

  if (username === 'admin' && password === '12345') {
    return response.json({
      username: 'admin',
      name: 'Admin User',
      token: 'fake-token-123'
    })
  }
  app.put('/api/blogs/:id', async (request, response) => {
  const body = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    },
    { returnDocument: 'after' }
  )

  response.json(updatedBlog)
})

  response.status(401).json({ error: 'invalid credentials' })
})

const PORT = 3003

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

module.exports = app



