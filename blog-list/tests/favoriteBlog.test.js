const { test, describe} = require('node:test')
const assert = require('node:assert')

const listHelper = require('../utils/list_helper')

describe('favorite blog', () => {
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
            author: 'No Name',
            url: 'https://one.com',
            likes: 2,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f2',
            title: 'Two',
            author: 'No Name',
            url: 'https://two.com',
            likes: 4,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f3',
            title: 'Three',
            author: 'No Name',
            url: 'https://three.com',
            likes: 6,
            __v: 0
        }
    ]
    test('of empty list is empty object', () => {
        const result = listHelper.favoriteBlog(emptyList)
        assert.deepStrictEqual(result, {})
      })
    test('when list has only one blog, equals this blog', () => {
        const result = listHelper.favoriteBlog(listWithOneBlog)
        assert.deepStrictEqual(result, {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
          })
      })
    test('of a bigger list is selected right', () => {
        const result = listHelper.favoriteBlog(listWithSeveralBlogs)
        assert.deepStrictEqual(result, {
            title: 'Three',
            author: 'No Name',
            likes: 6
        })
      })
})