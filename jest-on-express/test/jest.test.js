/**
 * Test Case based on Jest
 *
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

  /**
   * [Using Matchers](https://jestjs.io/docs/en/using-matchers)
   *
   * https://jestjs.io/docs/en/expect
   *
   */
  describe('Jest Assertion - Expect', () => {
    /**
     * [Truthiness](https://jestjs.io/docs/en/using-matchers#truthiness)
     *
     */
    describe('Truthiness', () => {
      test('null', () => {
        const n = null
        expect(n).toBeNull()
        expect(n).toBeDefined()
        expect(n).not.toBeUndefined()
        expect(n).not.toBeTruthy()
        expect(n).toBeFalsy()
      })

      test('zero', () => {
        const z = 0
        expect(z).not.toBeNull()
        expect(z).toBeDefined()
        expect(z).not.toBeUndefined()
        expect(z).not.toBeTruthy()
        expect(z).toBeFalsy()
      })
    })

    /**
     * [Numbers](https://jestjs.io/docs/en/using-matchers#numbers)
     *
     */
    describe('Numbers', () => {
      test('two plus two', () => {
        const value = 2 + 2
        expect(value).toBeGreaterThan(3)
        expect(value).toBeGreaterThanOrEqual(3.5)
        expect(value).toBeLessThan(5)
        expect(value).toBeLessThanOrEqual(4.5)

        // toBe and toEqual are equivalent for numbers
        expect(value).toBe(4)
        expect(value).toEqual(4)
      })

      test('adding floating point numbers', () => {
        const value = 0.1 + 0.2
        // expect(value).toBe(0.3);           This won't work because of rounding error
        expect(value).toBeCloseTo(0.3) // This works.
      })
    })

    /**
     * [Strings](https://jestjs.io/docs/en/using-matchers#strings)
     *
     */
    describe('Strings', () => {
      test('there is no I in team', () => {
        expect('team').not.toMatch(/I/)
      })

      test('but there is a "stop" in Christoph', () => {
        expect('Christoph').toMatch(/stop/)
      })
    })

    /**
     * [Arrays](https://jestjs.io/docs/en/using-matchers#arrays)
     *
     */
    describe('Arrays', () => {
      const shoppingList = [
        'diapers',
        'kleenex',
        'trash bags',
        'paper towels',
        'beer'
      ]

      test('the shopping list has beer on it', () => {
        expect(shoppingList).toContain('beer')
      })
    })

    /**
     * [Exceptions](https://jestjs.io/docs/en/using-matchers#exceptions)
     *
     */
    describe('Exceptions', () => {
      function compileAndroidCode () {
        throw new Error('you are using the wrong JDK')
      }

      test('compiling android goes as expected', () => {
        expect(compileAndroidCode).toThrow()
        expect(compileAndroidCode).toThrow(Error)

        // You can also use the exact error message or a regexp
        expect(compileAndroidCode).toThrow('you are using the wrong JDK')
        expect(compileAndroidCode).toThrow(/JDK/)
      })
    })

    describe('Object', () => {
      const can1 = {
        flavor: 'grapefruit',
        ounces: 12
      }
      const can2 = {
        flavor: 'grapefruit',
        ounces: 12
      }

      describe('the La Croix cans on my desk', () => {
        test('have all the same properties', () => {
          expect(can1).toEqual(can2)
        })
        test('are not the exact same can', () => {
          expect(can1).not.toBe(can2)
        })
      })

      const houseForSale = {
        bath: true,
        bedrooms: 4,
        kitchen: {
          amenities: ['oven', 'stove', 'washer'],
          area: 20,
          wallColor: 'white'
        }
      }
      const desiredHouse = {
        bath: true,
        kitchen: {
          amenities: ['oven', 'stove', 'washer'],
          wallColor: expect.stringMatching(/white|yellow/)
        }
      }

      test('the house has my desired features', () => {
        expect(houseForSale).toMatchObject(desiredHouse)
      })
    })
  })
})
