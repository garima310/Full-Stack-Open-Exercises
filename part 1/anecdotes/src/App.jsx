import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...',
    'Any fool can write code that a computer can understand...',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code...',
    'Programming without an extremely heavy use of console.log...'
  ]

  const [selected, setSelected] = useState(0)

  const [votes, setVotes] = useState(
    new Array(anecdotes.length).fill(0)
  )

  const maxVotes = Math.max(...votes)
  const maxIndex = votes.indexOf(maxVotes)

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>

      <button onClick={() => {
        const copy = [...votes]
        copy[selected] += 1
        setVotes(copy)
      }}>
        vote
      </button>

      <button onClick={() =>
        setSelected(Math.floor(Math.random() * anecdotes.length))
      }>
        next anecdote
      </button>

      <h2>anecdote with most votes</h2>
      <p>{anecdotes[maxIndex]}</p>
      <p>has {maxVotes} votes</p>
    </div>
  )
}

export default App