import { useState } from 'react'
import Button from './components/Button'
import StaticLine from './components/StaticLine'
import Statistics from './components/Statistics';
function App() {
  const [good, setGood] = useState(0);
  const [bad, setBad] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const handleClickGood =()=>{
    setGood(good + 1);
    console.log("Debbugging...",good);
  }
    const handleClickBad =()=>{
    setBad(bad + 1);
    console.log("Debbugging...",bad);
  }
    const handleClickNeutral =()=>{
    setNeutral(neutral + 1);
    console.log("Debbugging...",neutral);
  }
  return (
    <>
      <Button onClickButton={handleClickGood} text="GOOD"/>
      <Button onClickButton={handleClickBad} text="BAD"/>
      <Button onClickButton={handleClickNeutral} text="NEUTRAL"/>
      
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </>
  )
}

export default App
