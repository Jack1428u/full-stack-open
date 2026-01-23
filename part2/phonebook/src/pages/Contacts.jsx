import InfoContact from "../components/InfoContact"
function Contacts({contacts, handleDelete}){
    return(
        <>
             {contacts.map(p =>(
                <InfoContact key={p.id} contact={p} handleDelete={handleDelete}/>
            ))}
        </>
    )
}
export default Contacts