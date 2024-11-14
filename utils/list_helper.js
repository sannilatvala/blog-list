const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    mostLikedBlog =  blogs.reduce((maxLikedBlog, currentBlog) => 
        currentBlog.likes > maxLikedBlog.likes ? currentBlog : maxLikedBlog)

return {
    title: mostLikedBlog.title,
    author: mostLikedBlog.author,
    likes: mostLikedBlog.likes
    }
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
      return null
    }

    const blogCounts = {}

    blogs.forEach(blog => {
      blogCounts[blog.author] = (blogCounts[blog.author] || 0) + 1
    })

    let maxAuthor = null
    let maxBlogs = 0

    for (const author in blogCounts) {
      if (blogCounts[author] > maxBlogs) {
        maxBlogs = blogCounts[author]
        maxAuthor = author
      }
    }

    return {
      author: maxAuthor,
      blogs: maxBlogs
    }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const authorLikes = {}

  blogs.forEach(blog => {
    authorLikes[blog.author] = (authorLikes[blog.author] || 0) + blog.likes
  })

  let maxAuthor = null
  let maxLikes = 0

  for (const author in authorLikes) {
    if (authorLikes[author] > maxLikes) {
      maxLikes = authorLikes[author]
      maxAuthor = author
    }
  }

  return {
    author: maxAuthor,
    likes: maxLikes
  }

}
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }
