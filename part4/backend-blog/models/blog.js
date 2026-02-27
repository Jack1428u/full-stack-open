const mongoose = require('mongoose')
const config = require('../utils/config')

mongoose.connect(config.MONGO_URI)

const BlogSchema = new mongoose.Schema({
    author: {
        type:String,
        minLength:2,
    },
    title:{
        type:String,
        minLength:5,
        required:true,
    },
    url: {
        type:String,
        required:true,
    },
    likes:{
        type:Number,
        default:0
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    }
})

BlogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString() // Crea 'id' como string
    delete returnedObject._id  // Elimina el original '_id'
    delete returnedObject.__v   // Elimina el campo de versión de Mongo
  }
})

const BlogModel = mongoose.model('Blog',BlogSchema)

mongoose.set('strictQuery',false)

module.exports = BlogModel