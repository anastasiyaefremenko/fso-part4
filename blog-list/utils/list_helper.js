const dummy = (blogs) => {
    return 1
  }
const totalLikes = (blogs) => {
    const reducer = (accumulator, currentValue) => {
        return accumulator + currentValue.likes
    }
    return blogs.reduce(reducer, 0)
}
const favoriteBlog = (blogs) => {
    if (blogs.length === 0) { 
        return {}
    }
    const favoriteBlog = blogs.reduce((previous, currentValue) => {
        return (previous && previous.likes > currentValue.likes) ? previous : currentValue
      })

    return {
        title: favoriteBlog.title,
        author: favoriteBlog.author,
        likes: favoriteBlog.likes,
    }
}
const mostBlogs = (blogs) => {
    if (blogs.length === 0) { 
        return {}
    }
    const numberOfBlogsByAuthor = blogs.reduce((previous, currentValue) => {

        const author = currentValue.author;
        const blogs = previous[author] ? previous[author] + 1 : 1


        return {...previous, [author]: blogs}
    }, {})

    const authorWithMostBlogs = Object.entries(numberOfBlogsByAuthor).reduce((previous, currentValue) => {
        const current = {author: currentValue[0], blogs: currentValue[1]}

        return (previous && previous.blogs > current.blogs) ? previous : current
    }, undefined)

    return authorWithMostBlogs
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
  }