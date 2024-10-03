const { test, describe} = require('node:test')
const assert = require('node:assert')

const listHelper = require('../utils/list_helper')

describe('most likes', () => {
    const emptyList = []
    const listWithOneBlog = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Canonical string reduction',
          author: 'Edsger W. Dijkstra',
          url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
          likes: 12,
          __v: 0
        }
      ]
    const listWithSeveralBlogs = [
        {
            _id: '5a422aa71b54a676234d17f1',
            title: 'One',
            author: 'John Doe',
            url: 'https://one.com',
            likes: 2,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f2',
            title: 'Two',
            author: 'John Doe',
            url: 'https://two.com',
            likes: 4,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f3',
            title: 'Three',
            author: 'John Doe',
            url: 'https://three.com',
            likes: 6,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f3',
            title: 'Three',
            author: 'Agatha Christie',
            url: 'https://three.com',
            likes: 6,
            __v: 0
        }
    ]
    test('returns empty object when list is empty', () => {
        const result = listHelper.mostLikes(emptyList)
        assert.deepStrictEqual(result, {})
      })
    test('returns the author with most likes when the list has only one blog', () => {
        const result = listHelper.mostLikes(listWithOneBlog)
        assert.deepStrictEqual(result, {
            author: "Edsger W. Dijkstra",
            likes: 12
          })
      })
    test('returns the author with most likes when the list has many blogs', () => {
        const result = listHelper.mostLikes(listWithSeveralBlogs)
        assert.deepStrictEqual(result, {
            author: 'John Doe',
            likes: 12
        })
      })
})