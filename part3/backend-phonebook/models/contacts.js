const mongoose = require('mongoose')
require('dotenv').config();
const URL = `mongodb+srv://utrillajack_db_user:${process.env.PASSWORD_DB}@cluster0.fpqitkq.mongodb.net/?appName=Cluster0`

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 2,
        required: true
    },
    number: {
        type: String,
        minLength: 8,   
        validate: {
            validator: function (value) {
                // format "xx-xxxxxxx" o "xxx-xxxxxxxx".
                return /^\d{2,3}-\d+$/.test(value)
            },
            message:'The number must have the correct format(ej: 09-1234567 o 040-22334455)'
        }
    },
})

const ContactModel = mongoose.model('Contact', contactSchema)
mongoose.set('strictQuery', false);
const connectDB = async () => {
    await mongoose.connect(URL);
}

const closeDB = async () => {
    await mongoose.connection.close();
}

module.exports = { connectDB, ContactModel, closeDB }