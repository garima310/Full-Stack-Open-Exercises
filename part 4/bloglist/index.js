
const express = require('express')
const mongoose = require('mongoose')

const app = express()

const Blog = require('./models/blog')

const mongoUrl = 'mongodb+srv://garimaa298:Garima310@spirecluster0.y3nbbog.mongodb.net/?appName=SpireCluster0'
mongoose.connect(mongoUrl, { family: 4 })

app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)
  if (!request.body.title || !request.body.url) {
  return response.status(400).json({ error: 'title or url missing' })
}
app.delete('/api/blogs/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})

const PORT = 3003
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}
module.exports = app