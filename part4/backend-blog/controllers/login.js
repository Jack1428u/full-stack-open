const jwt = require('jsonwebtoken')
const UserModel = require('../models/user')
const bcryptjs = require('bcryptjs')
const loginRouters = require('express').Router()

loginRouters.post('/', async (request, response, next) => {
    const { username, password } = request.body;
    const user = await UserModel.findOne({ username })
    const passwordCorrect = password === null ? false : await bcryptjs.compare(password,user.passwordHash)

    if (!passwordCorrect) {
        return response.status(400).json({
            error: "The username or password invalid"
        })
    }
    const payload = { username: user.username, name: user.name ,id:user._id}
    const token = jwt.sign(payload, process.env.SECRET)
    return response.status(200).json({
        username, name: user.name, token
    })
})

module.exports = loginRouters