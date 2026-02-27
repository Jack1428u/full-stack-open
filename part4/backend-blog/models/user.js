const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    username:{
        type:String,
        minLength:[3,'Minimun length is 3'],
        required:true,
    },
    name:String,
    passwordHash:{
        type:String,
    },
    blogs:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Blog'
        }
    ]
})

UserSchema.set('toJSON',{
    transform:(document,returnedObject)=>{
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id
        delete returnedObject.__v
    }
})
const UserModel = mongoose.model('User',UserSchema)
module.exports = UserModel