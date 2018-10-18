/**
 * [Testing Asynchronous Code](https://jestjs.io/docs/en/asynchronous)
 */
// process.env.NODE_ENV = 'dev'
const debug = require('debug')('jest:api')
debug.enabled = true

// 测试用例
describe('Jest Usage', () => {
  beforeAll(() => {
    debug('beforeAll')
  })
  // shutdown after all tests
  afterAll(() => {})

  describe('Promises', () => {
    test('the data is peanut butter', () => {
      expect.assertions(1)
      return expect(Promise.resolve('peanut butter')).resolves.toBe(
        'peanut butter'
      )
    })

    // test('the fetch fails with an error', () => {
    //   expect.assertions(1)
    //   return expect(Promise.reject('error')).rejects.toMatch('error')
    // })
  })
})
