function Content ({parts}){
    return (
        <>
            <p>{parts[0].part} -- Quantity Exercises: <strong>{parts[0].exercises}</strong></p>
            <p>{parts[1].part} -- Quantity Exercises: <strong>{parts[1].exercises}</strong></p>
            <p>{parts[2].part} -- Quantity Exercises: <strong>{parts[2].exercises}</strong></p>
        </>
    )
}

function Header({title}){
    return(
        <>
            <h1>Title of course: {title}</h1>
        </>
    )
}

function Total({total}){
    return(
        <>
            <p>Total: <strong>{total}</strong> </p>
        </>
    )
}

function App() {
  const course ={
    name :'Half Stack application development',
    parts :[
    {
      part : 'Fundamentals of React',
      exercises : 10,
    },
    {
      part : 'Using props to pass data',
      exercises : 7,
    },
    {
      part : 'State of a component',
      exercises : 14,
    }
  ],
  };
  const total = course.parts[0].exercises+course.parts[1].exercises+course.parts[2].exercises;
  return (
    <>
    <Header title={course.name} />
    <br/>
    <Content parts={course.parts}/>
    <br/>
    <Total total={total} /> 
    </>
  ) 
}

export default App