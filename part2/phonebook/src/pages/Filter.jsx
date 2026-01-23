import { useState } from "react"
import InfoContact from "../components/InfoContact";
import clean from "../utilities/validation";
function Filter({ contacts }) {
    const [filterContacts, setFilterContacts] = useState([]);
    const [searched, setSearched] = useState({
        name: "",
        number: "",
    })
    const [name, setName] = useState("");
    const handleSearch = (event) => {
        setName(event.target.value);
        for (let i = 0; i < contacts.length; i++) {
            console.log("Buscadno...", contacts[i].name);
            const stringInclude = (cadena, condicion) => {
                console.log(cadena.includes(condicion) && condicion.length > 2);
                return cadena.includes(condicion) && condicion.length > 2;
            }
            console.log("cadenas comparadas...", clean(contacts[i].name), clean(name));
            if (stringInclude(clean(contacts[i].name), clean(name))) {
                const objSearched = {
                    name: contacts[i].name,
                    number: contacts[i].number,
                }
                setSearched(objSearched);
                console.log("Encontrado!");
                break;
            } else {
                console.log("no encontrado");
                setFilterContacts([]);
            }
        }
    }
    return (
        <>
            <label for="search">Search: </label>
            <input type="search" id="search" name="search" onChange={handleSearch} />
            {(searched.name && searched.number) ? <InfoContact contact={searched} />:''}
        </>
    )
}
export default Filter