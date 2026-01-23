import Header from "./Header"
import Content from "./content"
function Course({course}){
    console.log(course)
    return(
        <>
            <Header title={course.name} />
            <Content parts={course.parts} />
        </>
    )
}
export default Course