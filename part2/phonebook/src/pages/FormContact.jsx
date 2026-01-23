function FormContact({ handleSubmit, handleInput, newContact, handleUpdate }) {
    return (
        <>
            <form onSubmit={handleSubmit} >
                <label for="name"><strong>Name: </strong></label>
                <input
                    value={newContact.name}
                    id="name" name="name"
                    type="text"
                    onChange={handleInput}
                    required={true}
                    autoCapitalize="words" />
                <br />
                <label for="number"><strong>Number: </strong></label>
                <input
                    value={newContact.number}
                    id="number"
                    name="number"
                    type="tel"
                    onChange={handleInput}
                    required={true}
                    minLength={9}
                    maxLength={9} />
                <br />
                <button type="submit">Submit</button>
            </form>
            <button onClick={handleUpdate}>Update Number</button>
        </>
    )
}
export default FormContact