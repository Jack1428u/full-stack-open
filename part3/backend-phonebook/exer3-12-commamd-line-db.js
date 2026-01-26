/* 

EXERCISE 3.12: COMMAND LINE DATABASE

*/
const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log("You must give a password as argument")
    process.exit(1)
}

const password = process.argv[2]

const URL = `mongodb+srv://utrillajack_db_user:${password}@cluster0.fpqitkq.mongodb.net/?appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(URL)

const ContactSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const ContactModel = mongoose.model('Contact', ContactSchema)

const name = process.argv[3]
const number = process.argv[4]

if (name && number) {
    const newContact = new ContactModel({ name, number })
        .save()
        .then(saved => {
            console.log(`Add ${saved.name} with number: ${saved.number} to phonebook`)
            return ContactModel.find({})
        })
        .then(contacts => {
            contacts.forEach(c => console.log(c))
            mongoose.connection.close()
        })
        .catch(err => {
            console.error('Error:', err)
            mongoose.connection.close()
        })
} else {
    ContactModel.find({})
        .then(contacts => {
            contacts.forEach(c => console.log(c))
            mongoose.connection.close();
        })
        .catch(err => {
            console.error('Error:', err)
            mongoose.connection.close()
        })
}