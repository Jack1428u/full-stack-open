import { useState, useEffect } from 'react'
import Contacts from './pages/Contacts' // Page of list contacts
import FormContact from './pages/FormContact' // Form contact
import Filter from './pages/Filter' // Filter
import clean from './utilities/validation' // Clean the string name
import { getData, postData, updateData, deleteData } from './services/people'
import './App.css'
import Msg from './components/Msg'
//alert
function App() {
    const [contacts, setContacts] = useState([]);
    const [newContact, setNewContact] = useState({
        name: "",
        number: "",
    })
    const [msg, setMsg] = useState({
        content: null,
        type: null,
    });
    useEffect(() => {
        console.log("charging data..")
        async function loadData() {
            try {
                const response = await getData();
                setContacts(response);
            } catch {
                setMsg({
                    content: "A error occur charging data",
                    type: "error",
                })
                console.log("A error")
                const timer = setTimeout(() => {
                    setMsg({
                        content: null,
                        type: null,
                    });
                }, 5000);
                return () => clearTimeout(timer);// Limpieza: si el componente se desmonta, cancelamos el timer
            }
        }
        loadData();
    }, [])
    useEffect(()=>{
        if(msg){
            setTimeout(()=>{
                setMsg({
                    content:null,
                    type:null,
                })
            },5000)
            console.log("reiniciando msg...");
        }
    },[msg])
    const handleInput = (event) => {
        const { name, value } = event.target;
        console.log("Name: ", name, "Value: ", value);
        setNewContact({
            ...newContact,
            [name]: value,// Propiedad computada, sirve para name y number.
        });
        console.log("Since handle input, newcontact: ", newContact);
    }
    const exitsName = (new_contact, contactsList) => {
        return contactsList.some(contact => clean(contact.name) === clean(new_contact.name));
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if (exitsName(newContact, contacts)) {
            // alert("Name already exists");
            setMsg({
                content: "Name already exists",
                type: "warning",
            })
            return;
        }
        postData(newContact)
            .then(returnedContact => {
                console.log("Contact created: ", returnedContact);
                const newContacts = contacts.concat(returnedContact);
                setContacts(newContacts);
                setNewContact({ name: "", number: "" })
                setMsg({
                    content: "User created successfully",
                    type: "success",
                })
            })
            .catch(error => setMsg({
                content:"Error creating contact",
                type:"error",
            }))
    }
    const handleUpdate = () => {
        const uContact = contacts.find(contact => clean(contact.name) === clean(newContact.name));
        if (!uContact) {
            setMsg({
                content: "Contact not exits",
                type: "error",
            });
            return;
        }
        if (!(window.confirm(`${uContact.name}exist. Replace number?`))) {
            return;
        }
        const changedContact = { ...uContact, number: newContact.number };
        updateData(changedContact.id, changedContact)
            .then(returnedContact => { // Clean object (data)
                setContacts(contacts.map(c =>
                    c.id !== uContact.id ? c : returnedContact
                ))
                setMsg({
                    content: "User uptated successfully",
                    type: "success",
                })
            })
            .catch(error => {
                // alert(`Error: Information of ${uContact.name} has already been removed from server`);
                setMsg({
                    content: `Error: Information of ${uContact.name} has already been removed from server`,
                    type: "error",
                });
                setContacts(contacts.filter(c => c.id !== uContact.id));
            })
    }
    const handleDelete = (id, name) => {
        if (window.confirm(`Delete ${name}?`)) {
            deleteData(id)
                .then(() => {
                    setContacts(contacts.filter(c => c.id !== id));
                })
                .catch(error => {
                    // alert(`The contact '${name}' was already deleted from server`);
                    setMsg({
                        content: `The contact '${name}' was already deleted from server`,
                        type: "warning",
                    });
                    setContacts(contacts.filter(c => c.id !== id));
                });
        }
    }
    return (
        <>
            <h1>Contacts</h1>
            <Contacts
                contacts={contacts}
                handleDelete={handleDelete} />
            {msg.content ? <Msg content={msg.content} type={msg.type} /> : ''}
            <h1>Add Contact</h1>
            <FormContact
                handleSubmit={handleSubmit}
                handleInput={handleInput}
                newContact={newContact}
                handleUpdate={handleUpdate}
            />

            <h1>Filter</h1>
            <Filter contacts={contacts} />
        </>
    )
}
export default App