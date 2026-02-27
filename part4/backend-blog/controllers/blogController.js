const BlogModel = require('../models/blog')
const express = require('express')
const blogRouters = express.Router()
const logger = require('../utils/logger')
const UserModel = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

blogRouters.get('/', async (request, response, next) => {
    try {
        const data = await BlogModel.find({}).populate('user', { username: 1, name: 1 })
        response.json(data)
    } catch (error) {
        next(error)
    }
})

blogRouters.post('/',middleware.userExtractor, async (request, response, next) => {
    try {
        const body = request.body
        const tokenValid = jwt.verify(request.token, process.env.SECRET)
        if (!tokenValid.id) {
            return response.status(401).json({
                error: "Token invalid"
            })
        }
        // const user = await UserModel.findById(tokenValid.id)
        const user = request.user

        const newBlog = new BlogModel({
            author: body.author,
            title: body.title,
            url: body.url,
            likes: body.likes,
            user: user._id,
        })

        const savedBlog = await newBlog.save()
        const populateBlog = await BlogModel
            .findById(savedBlog._id)
            .populate('user', { username: 1, name: 1 });
        logger.info("REQUEST-POST-BODY: ", body)

        if (!user.blogs) user.blogs = []; // Asegurar que sea un array
        user.blogs = user.blogs.concat(savedBlog)
        await user.save()

        response.status(201).json(populateBlog) // Agrega status 201 para creación exitosa

    } catch (error) {
        next(error)
    }
})

blogRouters.get('/:id', async (request, response, next) => {
    try {
        const blog = await BlogModel.findById(request.params.id)
        if (!blog) {
            return response.status(404).json({
                error: `404 not found, the ID blog${request.params.id} not exists`
            })
        }
        return response.status(200).json(blog)
    } catch (error) {
        next(error)
    }
})

// 4.13: Delete a blog
blogRouters.delete('/:id',middleware.userExtractor, async (request, response, next) => {
    try {
        // user.id === token.id
        const blog = await BlogModel.findById(request.params.id) // request.params.id -> id of blog
        const tokenValid = jwt.verify(request.token, process.env.SECRET)
        if (!tokenValid) {
            return response.status(401).json({
                error: "Token invalid",
            })
        }
        if (blog.user.toString() !== tokenValid.id.toString()) {
            return response.status(401).json({
                error:"Unauthorized"
            })
        }

        await BlogModel.findByIdAndDelete(request.params.id)
        response.status(204).end() // 204 No Content
    } catch (error) {
        next(error)
    }
})

// 4.14 Update a Blog
blogRouters.patch('/:id', async (request, response, next) => {
    try {
        const uBlog = await BlogModel.findByIdAndUpdate(
            request.params.id,
            request.body,
            { new: true, runValidators: true }
        )
        response.json(uBlog)
    } catch (error) {
        next(error)
    }
})

module.exports = blogRouters