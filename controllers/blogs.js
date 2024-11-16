const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs)
  } catch (error) {
    next(error)
  }
})
  
blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(blog)
    } else {
      response.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})
  
blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  if (!body.title) {
    return response.status(400).json({ error: 'Title is required' })
  }

  if (!body.url) {
    return response.status(400).json({ error: 'URL is required' })
  }

  try {
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0
    })

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findByIdAndDelete(request.params.id)

    if (!blog) {
      return response.status(404).end()
    }

    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  if (body.likes === undefined) {
    return response.status(400).json({ error: 'Likes value is required' })
  }

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})

    if (!updatedBlog) {
      return response.status(404).end()
    }

    response.status(200).json(updatedBlog)

  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter
