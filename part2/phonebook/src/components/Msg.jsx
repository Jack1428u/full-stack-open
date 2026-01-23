import '../App.css'
export default function Msg({content, type}){
    return(
        <span className={`msg ${type}`}>{content}</span>
    )
}