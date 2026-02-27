const UserModel = require('../models/user')
const BlogModel = require('../models/blog')
const userRouters = require('express').Router()
const bcryptjs = require('bcryptjs')
const middleware = require('../utils/middleware')

userRouters.get('/', async (request, response, next) => {
    try {
        const users = await UserModel.find({}).populate('blogs');
        response.status(200).json(users);
    }
    catch (error) {
        next(error);
    }
})

userRouters.post('/',async (request, response, next) => {
    try {
        const { username, name, password } = request.body;
        if (password.length < 3) {
            return response.status(400).json({
                error: "The password should have 3 minimun characters"
            })
        }
        const users = await UserModel.find({});
        const usernameExists = users.some(user => user.username === username);

        if (usernameExists) {
            return response.status(400).json({
                error: "The username already exists"
            })
        }
        const passwordHash = (await bcryptjs.hash(password, 10)).toString();
        const newUser = new UserModel({ username, name, passwordHash });
        const saved = await newUser.save();
        response.status(200).json(saved);
    } catch (error) {
        next(error);
    }
})

module.exports = userRouters