import { useState } from 'react'
function App() {
  const anecdotes = [
    'If it hurts, do it more often.',

    'Adding manpower to a late software project makes it later!',

    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',

    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',

    'Premature optimization is the root of all evil.',

    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',

    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',

    'The only way to go fast, is to go well.'
  ]
  const getIntegerRandom = (max) => Math.floor(Math.random() * max);
  const [option, setOption] = useState(-1);
  const handleOption = () => {
    setOption(getIntegerRandom(anecdotes.length));
    console.log("Debbuggin...", option);
  }
  const [votes, setVotes] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
  })
  const handleVote = (optionVote) => {
    const newVotes = {
      ...votes,
    }
    newVotes[optionVote] += 1;
    setVotes(newVotes)
    console.log("Option voted...",optionVote);
  }
  if (option === -1) {
    return (
      <>
        <h1>Press a button for start.</h1>
        <button onClick={handleOption}>Next anecdote</button>
      </>
    )
  }
  return (
    <>
      <h1>Random Anecdote</h1>
      <p>Current anecdote: {option}</p>
      <p>Content: {anecdotes[option]}</p>
      <button onClick={handleOption}>Next anecdote</button>
      <br/><br/>   
      <button onClick={() => handleVote(option)}>Vote</button>
      <br/>
      <span>Votes: {votes[option]}</span>
    </>
  )
}
export default App