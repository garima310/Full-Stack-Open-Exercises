const express = require('express')
const app = express()
const morgan = require('morgan')
morgan.token('data', (request) => {
  return JSON.stringify(request.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))
app.use(express.json())
let persons = [
  { id: 1, name: 'Arto Hellas', number: '040-123456' },
  { id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
  { id: 3, name: 'Dan Abramov', number: '12-43-234345' },
  { id: 4, name: 'Mary Poppendieck', number: '39-23-6423122' }
]

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  app.get('/api/persons/:id', (request, response, next) => {
  const id = Number(request.params.id)

  if (isNaN(id)) {
    return response.status(400).json({ error: 'malformatted id' })
  }

  const person = persons.find(p => p.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})
})
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)

  const exists = persons.some(p => p.id === id)

  if (!exists) {
    return response.status(404).end()
  }

  persons = persons.filter(p => p.id !== id)

  response.status(204).end()
})
app.post('/api/persons', (request, response) => {
  const body = request.body

 
  if (!body.name) {
    return response.status(400).json({ error: 'name missing' })
  }

 
  if (!body.number) {
    return response.status(400).json({ error: 'number missing' })
  }

  const nameExists = persons.some(p => p.name === body.name)

  if (nameExists) {
    return response.status(400).json({ error: 'name must be unique' })
  }

  const newPerson = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * 10000)
  }

  persons = persons.concat(newPerson)

  response.json(newPerson)
})
app.get('/info', (request, response) => {
  const total = persons.length
  const date = new Date()

  response.send(`
    <p>Phonebook has info for ${total} people</p>
    <p>${date}</p>
  `)
})

app.put('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const body = request.body

  const person = persons.find(p => p.id === id)

  if (!person) {
    return response.status(404).end()
  }

  const updatedPerson = {
    ...person,
    number: body.number
  }

  persons = persons.map(p => p.id !== id ? p : updatedPerson)

  response.json(updatedPerson)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

app.use(errorHandler)
const PORT = 3002
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
