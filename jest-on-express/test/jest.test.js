/**
 * Test Case based on Jest
 *
 */
// process.env.NODE_ENV = 'dev'
const debug = require('debug')('jest:api')
debug.enabled = true

// 测试用例
describe('Express API - /api/', () => {
  beforeAll(() => {
    debug('beforeAll')
  })
  // shutdown after all tests
  afterAll(() => {
    // setTimeout(() => {
    //   debug('afterAll - exit test after 1.5s')
    //   process.exit()
    // }, 1500)
  })

  describe('用户 API 测试', () => {
    test('1. /api/users#获取全部用户列表', () => {
      debug('config env=%s', process.env.NODE_ENV)
    })
  })

  describe('test.each(table)(name, fn)', () => {
    test.each([
      [1, 1, 3],
      [1, 2, 3],
      [2, 1, 3]
    ])('%i + %i = %i', (a, b, expected) => {
      expect(a + b).toBe(expected)
      return expect(1).toBe(1)
    })
  })
})
