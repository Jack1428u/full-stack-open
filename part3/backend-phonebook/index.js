const { connectDB, ContactModel} = require('./models/contacts')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const { clean } = require('./utilities/validation')

const app = express()

// Middleware
app.use(express.json())
app.use(cors({ origin: process.env.FRONTEND_URL }))
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :body'))

// Connect DB
connectDB();

app.get('/api/contacts/', async (request, response, next) => {
    try {
        const contacts = await ContactModel.find({});
        response.json(contacts)
    } catch (error) {
        next(error)
    }
})

app.get('/api/contacts/:id/', async (request, response, next) => {
    try {
        const contact = await ContactModel.findById(request.params.id)
        if (contact) {
            console.log("GET FOR ID: ", contact);
            response.json(contact);
        } else {
            console.log("Not Found")
            response.status(404).end();
        }
    } catch (error) {
        next(error)
    }
})

app.post('/api/contacts', async (request, response, next) => {
    const name = request.body.name
    const number = request.body.number
    if (!(name && number)) {
        return response.status(400).json({
            error: "content missing: name or number is required"
        })
    }
    try {
        const contacts = await ContactModel.find({})
        const exists = contacts.find(c => clean(c.name.toLowerCase()) === clean(name.toLowerCase()))
        if (exists) {
            return response.status(400).json({
                error: `The name ${name} already exists`
            })
        }
        const newContact = new ContactModel({ name, number })
        newContact.save()
            .then(saved => response.json({ saved }))
            .catch(err => next(err))
    }catch(error){
        next(error)
    }
})

app.get('/info/', async (request, response, next) => {
    try {
        const contacts = await ContactModel.find({})
        console.log(contacts.length)
        response.send(`<p>Phonebook has: ${contacts.length} </p></br><p>${new Date()}</p>`)
    } catch (error) {
        next(error)
    }
})

app.delete('/api/contacts/:id', async (request, response, next) => {
    //const contact = phonebook.find(c => c.id === id);
    try {
        const contact = await ContactModel.findByIdAndDelete(request.params.id)
        if (!contact) {
            return response.status(404).json({
                error: "The contact no exists"
            })
        }
        console.log("Deleted contact: ", contact)
        return response.status(204).json({
            msg: `Deleted contact: ${contact}`
        })
    } catch (error) {
        next(error)
    }
})

app.patch('/api/contacts/:id', async (request, response, next) => {
    const number = request.body.number
    if (!number) {
        return response.status(400).json({
            error: 'You must give a number'
        })
    }
    try {
        const uContact = await ContactModel.findByIdAndUpdate(
            request.params.id, // filter by id
            { number: number }, // update once number
            { new: true, runValidators: true } // return document update
        )
        if (!uContact) {
            return response.status(404).json({
                error: `Contact no found`
            })
        }
        response.json(uContact)
    } catch (error) {
        // return response.status(500).json({
        //     error: `A error occured: ${error}`
        // })
        next(error)
    }
})

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'Unknown endpoint' })
}
app.use(unknownEndpoint)

const handleError = (error, req, res, next) => {
    console.log("error: ", error)
    // Este catch captura el CastError cuando el ID no es un ObjectId válido
    if (error.name === 'CastError') {
        res.status(400).send({ error: 'malformatted id' })
    }
    if (error.name === 'ValidationError') {
        // Devolvemos el mensaje que definiste en el esquema
        return res.status(400).json({ error: error.message })
    }
    next(error)
}

app.use(handleError)

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log("Listen in PORT: ", PORT)