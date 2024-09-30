const { test, describe} = require('node:test')
const assert = require('node:assert')

const listHelper = require('../utils/list_helper')

describe('total likes', () => {
    const emptyList = []
    const listWithOneBlog = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
          likes: 5,
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
    test('of empty list is zero', () => {
        const result = listHelper.totalLikes(emptyList)
        assert.strictEqual(result, 0)
      })
    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        assert.strictEqual(result, 5)
      })
    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(listWithSeveralBlogs)
        assert.strictEqual(result, 12)
      })
})