/**
 * Express API Test Case based on Jest&SuperTest
 *
 */
// process.env.NODE_ENV = 'dev'
const debug = require('debug')('jest:api:users')
debug.enabled = true
// HTTP assertions made with SuperTest
const request = require('supertest')

// 启动要测试的 Express API 服务程序
const app = require('../app')

// 直接测试独立运行的 HTTP 服务
// const app = 'http://localhost:8080/jest';

// 测试用例
describe('Express API - /api/', () => {
  beforeAll(() => {
    debug('init test db...')
    return require('./bulk-create').addUsers()
  })
  // shutdown after all tests
  afterAll(() => {
    // setTimeout(() => {
    //   debug('afterAll - exit test after 1.5s')
    //   process.exit()
    // }, 1500)
  })
  const uri = '/users/'
  debug('uri=%s', uri)

  describe('用户 API 测试', () => {
    xtest('1. /api/users#获取全部用户列表', done => {
      request(app)
        .get(uri)
        // .then(res => {
        //   debug('jest.resp = ' + res.text)
        // })
        .expect(200, [{ id: 1, name: 'dsf' }, { id: 2, name: 'dsf' }], done)
    })
    test('2. /api/user/1#获取id是1的用户信息', () => {
      // expect.hasAssertions()
      request(app)
        .get(uri + '1')
        // .send('')
        // .expect(200, { id: 1, name: 'dsf' })
        .then(res => {
          // expect(res.statusCode).toBe(200);
          // response content
          debug('jest.resp = ' + res.text)
          // expect(res.text).toMatch("<ToUserName><![CDATA[张三]]></ToUserName>");
        })
        .catch(err => {
          debug('err = %s', err.message)
        })
    })
  })
})
