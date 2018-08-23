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

  describe('Jest Environment', () => {
    test('NODE_ENV set to jest', () => {
      debug('env=%s', process.env.NODE_ENV)
      expect(process.env.NODE_ENV).toBe('test')
    })
  })

  /**
   * [Jest Methods](https://jestjs.io/docs/en/api.html)
   */
  describe('Jest Methods Test', () => {
    /**
     * [test.each(table)(name, fn)](https://jestjs.io/docs/en/api.html#testeachtable-name-fn)
     *
     */
    describe('test.each(table)(name, fn)', () => {
      test.each([[1, 1, 2], [1, 2, 3], [2, 1, 3]])(
        '.add(%i + %i) = %i',
        (a, b, expected) => {
          expect(a + b).toBe(expected)
        }
      )
    })

    /**
     * [describe.skip(name, fn)](https://jestjs.io/docs/en/api.html#describeskipname-fn)
     *  alias: xdescribe(name, fn)
     */
    xdescribe('describe.skip(name, fn)', () => {
      test('a test', () => {
        expect(0).toBe(0)
      })
    })

    /**
     * https://jestjs.io/docs/en/api.html#testonlyname-fn-timeout
     *
     * test => test.only
     */
    test('test.only(name, fn, timeout) ignore other tests', () => {
      expect(1).toBeGreaterThan(0)
    })

    // describe('', () => {})
  })
})
