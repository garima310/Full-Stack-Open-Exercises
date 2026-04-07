const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../list_helper')

test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0)
  })

  test('when list has one blog equals the likes of that', () => {
    const list = [
      { title: 'Test', author: 'A', url: 'x', likes: 5 }
    ]

    const result = listHelper.totalLikes(list)
    assert.strictEqual(result, 5)
  })

  test('of bigger list is calculated right', () => {
    const list = [
      { title: 'A', author: 'A', url: 'x', likes: 5 },
      { title: 'B', author: 'B', url: 'y', likes: 3 },
      { title: 'C', author: 'C', url: 'z', likes: 2 }
    ]

    const result = listHelper.totalLikes(list)
    assert.strictEqual(result, 10)
  })
  describe('favorite blog', () => {

  const blogs = [
    {
      title: 'A',
      author: 'X',
      url: 'x',
      likes: 5
    },
    {
      title: 'B',
      author: 'Y',
      url: 'y',
      likes: 10
    },
    {
      title: 'C',
      author: 'Z',
      url: 'z',
      likes: 3
    }
  ]

  test('returns blog with most likes', () => {
    const result = listHelper.favoriteBlog(blogs)

    assert.deepStrictEqual(result, blogs[1])
  })

})

})