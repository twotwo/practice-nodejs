const debug = require('debug')('unit:redis-helper:test')
const redis = require('../utils/redis-helper')

// 测试用例
describe('testing redis-helper...', () => {
  beforeAll(() => { })
  afterAll(() => {
    // 测试完成后，关闭客户端连接
    debug('close redis %o', redis.close())
  })
  describe('1. put in cache for 5 seconds', () => {
    test('1.1 ', () => {
      redis
        .get('test')
        .then(value => {
          debug("redis.get('test')=%o", value)
          expect(value).toBeNull()
        })
        .catch(ex => {
          debug("redis.get('test') err=%s", ex.message)
        })
      redis.put('test', { a: 'abc', b: 123 }, 5)
      redis
        .get('test')
        .then(value => {
          debug("redis.get('test')=%o", value)
          expect(value).toMatchObject({ a: 'abc', b: 123 })
        })
        .catch(ex => {
          debug("redis.get('test') err=%s", ex.message)
        })
    })
    test('1.2 ', async () => {
      // debug('store=%o', redis.getStore())
      let value = await redis.get('test')
      debug("redis.get('test')=%o", value)
      expect(value).toMatchObject({ a: 'abc', b: 123 })

      await new Promise(resolve => setTimeout(resolve, 5000))
      debug('waiting for 5 seconds')
      value = await redis.get('test')
      debug("after 5 seconds, redis.get('test')=%o", value)
      expect(value).toBeNull()
    }, 5100)
  })
})
