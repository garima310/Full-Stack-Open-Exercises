import { useState } from 'react'

const PersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}
const Persons = ({ persons }) => {
  return (
    <ul>
      {persons.map(person => (
        <li key={person.name}>
          {person.name}: {person.number}
        </li>
      ))}
    </ul>
  )
}
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])

  const [newName, setNewName] = useState('')
const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const [filter, setFilter] = useState('')

  const addPerson = (event) => {
  event.preventDefault()

  const exists = persons.some(person => person.name === newName)

  if (exists) {
    alert(`${newName} is already added to phonebook`)
    return
  }

  const newPerson = { name: newName, number: newNumber }
  setPersons(persons.concat(newPerson))
  setNewName('')
  setNewNumber('')
}

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
  filter shown with <input value={filter} onChange={(e) => setFilter(e.target.value)} />
</div>

    <PersonForm 
  addPerson={addPerson}
  newName={newName}
  handleNameChange={handleNameChange}
  newNumber={newNumber}
  handleNumberChange={handleNumberChange}
/>

      <h2>Numbers</h2>
     <Persons persons={persons
  .filter(person => 
    person.name.toLowerCase().includes(filter.toLowerCase())
  )
} />
    </div>
  )
}

export default App