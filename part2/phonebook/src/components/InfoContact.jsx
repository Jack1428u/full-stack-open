import { useState } from "react";
import { updateData, deleteData } from "../services/people"
function InfoContact({ contact, handleDelete }) {
    return (
        <>
            <p>{contact.name} <strong>Number:</strong> {contact.number}</p>
            <button onClick={()=>handleDelete(contact.id, contact.name)}>
                Delete
            </button>
        </>
    )
}
export default InfoContact