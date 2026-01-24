const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
app.use(cors({origin:process.env.FRONTEND_URL}))
app.use(express.json())
morgan.token('body',(req)=>JSON.stringify(req.body))
app.use(morgan(':method :url :status :body'))
let phonebook = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/api/people/', (request, response) => {
    console.log(phonebook)
    response.json(phonebook)
})

app.get('/api/people/:id/', (request, response) => {
    const id = Number(request.params.id);
    const contact = phonebook.find(c => c.id === id);
    if (contact) {
        console.log("GET FOR ID: ", contact);
        response.json(contact);
    } else {
        console.log("Not Found")
        response.status(404).end();
    }
})

app.post('/api/people', (request, response) => {
    const body = request.body
    if(!(body.name && body.number)){
        return response.status(400).json({
            error:"content missing: name or number is required"
        })
    }
    const exists = phonebook.find(c => c.name.toLowerCase() == body.name.toLowerCase())
    if(exists){
        return response.status(404).json({
            error:`${body.name} already exists`
        })
    }
    const contact = {
        id: Math.floor((Math.random() * 10000000) + 1),
        name: body.name,
        number: body.number
    }
    console.log('*'.repeat(50));
    console.log("DEBUG POST: ",contact);
    console.log('*'.repeat(50));
    phonebook = phonebook.concat(contact);
    response.json(contact)
})

app.get('/info/',(request,response)=>{
    console.log(phonebook.length)
    response.send(`<p>Phonebook has: ${phonebook.length} </p></br><p>${new Date()}</p>`)
})

app.delete('/api/people/:id',(request,response)=>{
    const id = Number(request.params.id);
    const contact = phonebook.find(c =>c.id === id);
    if(!contact){
        return response.status(404).json({
            error:"The contact no exists"
        })
    }
    phonebook = phonebook.filter(c => c.id !== id);
    console.log("Deleted contact: ",contact)
    response.status(204).end();
})

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log("Listen in PORT: ", PORT)
//content