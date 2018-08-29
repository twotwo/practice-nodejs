const debug = require('debug')('unit:express-helper:test')
debug.enabled = true
const express = require('express')
const request = require('supertest')
// cache for 60 seconds
const cacheTime = 6

// 测试用例
describe('testing express-helper...', () => {
  beforeAll(() => {})
  afterAll(() => {
    const cache = require('memory-cache')
    // 清除掉设置了超时函数的key，否则会阻止测试例退出
    cache.clear()
    require('../utils/redis-helper').close()
  })

  describe('1. memory-cache', () => {
    const cache = require('memory-cache')
    test('1.1 ', () => {
      // debug('store=%o',store)
      // debug("close redis %o", close())
      cache.put('key', 'value', cacheTime * 1000)
    }, cacheTime * 1000)
  })
  describe('2. express-helper.cache', () => {
    const helper = require('../utils/express-helper')
    test('2.1 express test', () => {
      const app = express()

      app.request.querystring = function () {
        return require('url').parse(this.url).query
      }

      app.use('/', (req, res) => {
        res.end(req.querystring())
      })

      return request(app)
        .get('/foo?name=tobi')
        .then(res => {
          debug('1.1 resp =%s', res.text)
        })
        .catch(err => {
          debug('err = %s', err.message)
        })
    })
    test('2.2 express with cache', () => {
      const app = express()

      app.use('/test', helper.cache(cacheTime), (req, res) => {
        res.json({ code: 0, msg: '获取成功', date: new Date() })
        debug('end service')
      })

      return request(app)
        .get('/test')
        .then(response => {
          debug('1.1 resp =%s', response.text)
          expect(response.statusCode).toBe(200)
        })
        .catch(err => {
          debug('err = %s', err.message)
        })
    })
  })
})
