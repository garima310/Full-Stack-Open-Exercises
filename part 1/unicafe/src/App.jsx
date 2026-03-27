import { useState } from 'react'

const Statistic = (props) => {
  return (
    <p>
      {props.text} {props.value}
    </p>
  )
}
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>

      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>

      <h2>statistics</h2>

{good + neutral + bad === 0 ? (
  <p>No feedback given</p>
) : (
  <div>
    <Statistic text="good" value={good} />
    <Statistic text="neutral" value={neutral} />
    <Statistic text="bad" value={bad} />
    <Statistic text="all" value={good + neutral + bad} />

    <Statistic 
      text="average" 
      value={(good - bad) / (good + neutral + bad)} 
    />

    <Statistic 
      text="positive" 
      value={(good / (good + neutral + bad)) * 100 + " %"} 
    />
  </div>
)}
    </div>
  )
}

export default App