const mongoose = require('mongoose')
const supertest = require('supertest')
const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const app = require('../app')
const BlogModel = require('../models/blog')
const UserModel = require('../models/user')
const logger = require('../utils/logger')
const blogRouters = require('../controllers/blogController')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')


let userId
let token
const api = supertest(app)
const initialBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }
]

beforeEach(async () => {
    await BlogModel.deleteMany({})
    await UserModel.deleteMany({})
    const newUser = UserModel({
        username: "bot",
        name: "Bot User",
        passwordHash: await bcryptjs.hash('bot1234', 10)
    })

    const save = await newUser.save()
    // Save user id
    userId = save._id

    // Generate token
    const payload = { username: save.username, name: save.name, id: save._id }
    token = jwt.sign(payload, process.env.SECRET)

    await BlogModel.insertMany(initialBlogs.map(blog => ({ ...blog, user: userId })))
}
)

test('http get request', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('4.8- all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    // logger.info(response.body)
    assert.strictEqual(response.body.length, initialBlogs.length)
})

test('4.9- property id', async () => {
    const response = await api.get('/api/blogs');
    assert.ok(response.body[0].id)
})
test('4.10 (4.22)- test request post', async () => {
    const newBlog = {
        author: 'Mario Vargas Llosa',
        title: 'Ciudad y los perros',
        url: 'https://es.wikipedia.org/wiki/La_ciudad_y_los_perros_(novela)',
        likes: 650
    }

    const postResponse = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    // Verifica que el blog devuelto tenga los datos esperados
    assert.strictEqual(postResponse.body.author, newBlog.author)
    assert.strictEqual(postResponse.body.title, newBlog.title)
    assert.strictEqual(postResponse.body.url, newBlog.url)
    assert.strictEqual(postResponse.body.likes, newBlog.likes)
    assert.ok(postResponse.body.id, 'id should be defined')

    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, initialBlogs.length + 1)

    const created = response.body.find(b => b.title === newBlog.title)
    assert.ok(created, 'Blog not found')
    assert.strictEqual(created.author, newBlog.author)
    assert.strictEqual(created.title, newBlog.title)
    assert.strictEqual(created.url, newBlog.url)
    assert.strictEqual(created.likes, newBlog.likes)
    assert.ok(created.id, 'id should be defined')
})

test('4.11 excepted property likes,if likes property is missing, it defaults to 0', async () => {
    const newBlog = {
        title: 'Blog without likes',
        author: 'Test Author',
        url: 'http://test.com'
        // no likes
    }
    const response = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    assert.strictEqual(response.body.likes, 0)
})

test('4.12 backend responds with 400 if title or url are missing', async () => {
    const newBlog = {
        author: 'Author without data',
        likes: 5
    }

    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(400) // Verifica que el backend rechace la solicitud
})

test('4.13 - succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await BlogModel.find({})
    const blogToDelete = blogsAtStart[0]

    // 2. Delete of first blog
    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)

    // 3. Verifing the new length
    const blogsAtEnd = await BlogModel.find({})
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)

    // 4. Verifing that the title delete not exits
    const titles = blogsAtEnd.map(r => r.title)
    assert.strictEqual(titles.includes(blogToDelete.title), false)
})

test('4.14 - succeeds updating likes', async () => {
    // 1. Get a blog to update
    const blogsAtStart = await BlogModel.find({})
    const blogToUpdate = blogsAtStart[0]

    const newBlogData = {
        likes: blogToUpdate.likes + 10,
        title: blogToUpdate.title,
        author: blogToUpdate.author,
        url: blogToUpdate.url
    }

    // 3. Making a PATCH
    const result = await api
        .patch(`/api/blogs/${blogToUpdate.id}`)
        .send(newBlogData)
        .expect(200)

    // 4. Verified the new likes
    assert.strictEqual(result.body.likes, blogToUpdate.likes + 10)
})

test('4.23 - creating a blog without token fails', async () => {
    const newBlog = {
        title: 'No token',
        author: 'Tester',
        url: 'http://test.com',
        likes: 5
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
})

after(async () => {
    mongoose.connection.close();
})